import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnHeaderSimpleComponent } from './sn-header-simple.component';

describe.skip('Sn Header Simple Component', () => {
  let fixture: ComponentFixture<SnHeaderSimpleComponent>;
  let element: HTMLElement;
  let component: SnHeaderSimpleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnHeaderSimpleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnHeaderSimpleComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
