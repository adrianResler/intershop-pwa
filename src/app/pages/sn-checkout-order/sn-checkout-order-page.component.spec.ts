import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnCheckoutOrderPageComponent } from './sn-checkout-order-page.component';

// TODO: To fix once sn checkout order page component implemented
describe.skip('Sn Checkout Order Page Component', () => {
  let component: SnCheckoutOrderPageComponent;
  let fixture: ComponentFixture<SnCheckoutOrderPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnCheckoutOrderPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnCheckoutOrderPageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
