import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningPillsComponent } from './warning-pills.component';

describe('WarningPillsComponent', () => {
  let component: WarningPillsComponent;
  let fixture: ComponentFixture<WarningPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarningPillsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
