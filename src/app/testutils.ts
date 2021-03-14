/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { defer, of } from 'rxjs';

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
