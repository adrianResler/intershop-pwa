import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnCheckoutPageComponent } from './sn-checkout-page.component';

// TODO: To fix once sn-checkout-page component implemented
describe.skip('Sn Checkout Page Component', () => {
  let component: SnCheckoutPageComponent;
  let fixture: ComponentFixture<SnCheckoutPageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnCheckoutPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnCheckoutPageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
