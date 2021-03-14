import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { mapTo, catchError, switchMap, publishReplay, refCount } from 'rxjs/operators';

export class StatusContent<T> {
  readonly trigger$ = new BehaviorSubject<undefined>(undefined);
  readonly task$ = this.trigger$.pipe(
    switchMap(() => this.loadData()),
    publishReplay(1),
    refCount()
  );
  readonly content$ = this.getContent(this.trigger$, this.task$);
  readonly isLoading$ = this.isLoading(this.trigger$, this.task$);
  readonly error$ = this.isError(this.trigger$, this.task$);

  constructor(private loadData: () => Observable<T | undefined>) {}

  getContent(trigger$: Observable<unknown>, task$: Observable<T | undefined>): Observable<T | undefined> {
    return merge(trigger$.pipe(mapTo(undefined)), task$).pipe(
      catchError((e) => {
        console.log(e);
        return of(undefined);
      })
    );
  }

  isLoading(trigger$: Observable<unknown>, task: Observable<unknown>): Observable<boolean> {
    return merge(
      trigger$.pipe(mapTo(true)),
      task.pipe(
        catchError(() => of(undefined)),
        mapTo(false)
      )
    );
  }

  isError(trigger$: Observable<unknown>, task: Observable<unknown>): Observable<false | Error> {
    return merge(trigger$, task).pipe(
      mapTo(false),
      catchError((e) => of(e))
    );
  }
}
