import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnCheckoutOrderComponent } from './sn-checkout-order.component';

// TODO: To fix once sn checkout order component rightimplemented
describe.skip('Sn Checkout Order Component', () => {
  let component: SnCheckoutOrderComponent;
  let fixture: ComponentFixture<SnCheckoutOrderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnCheckoutOrderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnCheckoutOrderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
