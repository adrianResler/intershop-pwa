import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponent } from 'ng-mocks';
import { anything, instance, mock, verify } from 'ts-mockito';

import { CheckoutFacade } from 'ish-core/facades/checkout.facade';
import { makeHttpError } from 'ish-core/utils/dev/api-service-utils';
import { AddressFormContainerComponent } from 'ish-shared/address-forms/components/address-form-container/address-form-container.component';
import { ErrorMessageComponent } from 'ish-shared/components/common/error-message/error-message.component';
import { LoginFormComponent } from 'ish-shared/components/login/login-form/login-form.component';
import { InputComponent } from 'ish-shared/forms/components/input/input.component';

import { SnCheckoutAddressAnonymousComponent } from './sn-checkout-address-anonymous.component';

describe('Sn Checkout Address Anonymous Component', () => {
  let component: SnCheckoutAddressAnonymousComponent;
  let fixture: ComponentFixture<SnCheckoutAddressAnonymousComponent>;
  let element: HTMLElement;
  let fb: FormBuilder;
  let checkoutFacade: CheckoutFacade;

  beforeEach(async () => {
    checkoutFacade = mock(CheckoutFacade);

    await TestBed.configureTestingModule({
      declarations: [
        MockComponent(AddressFormContainerComponent),
        MockComponent(ErrorMessageComponent),
        MockComponent(InputComponent),
        MockComponent(LoginFormComponent),
        SnCheckoutAddressAnonymousComponent,
      ],
      imports: [NgbCollapseModule, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [{ provide: CheckoutFacade, useFactory: () => instance(checkoutFacade) }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnCheckoutAddressAnonymousComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fb = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should render login container component on page', () => {
    fixture.detectChanges();
    expect(element.querySelector('ish-login-form')).toBeTruthy();
  });

  it('should initially have shipping and invoice address forms on page', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('ish-address-form-container')).toHaveLength(2);
  });

  it('should initially not show invoice address form on page', () => {
    fixture.detectChanges();
    expect(element.querySelector('[data-testing-id=guest-checkout-button]')).toBeTruthy();
    expect(element.querySelector('div.collapse.show ish-address-form-container')).toBeFalsy();
  });

  it('should show invoice address form if checkout as guest button is clicked', () => {
    component.isAddressFormCollapsed = false;
    fixture.detectChanges();
    expect(element.querySelector('[data-testing-id=guest-checkout-button]')).toBeFalsy();
    expect(element.querySelector('div.collapse.show ish-address-form-container')).toBeTruthy();
    expect(component.form.controls.shipOption.value).toEqual('shipToInvoiceAddress');
    expect(
      element.querySelector('div.collapse.show[data-testing-id=shipping-address-form] ish-address-form-container')
    ).toBeFalsy();
  });

  it('should collapse address form when cancel is clicked', () => {
    component.isAddressFormCollapsed = false;
    fixture.detectChanges();
    component.cancelAddressForm();
    expect(component.isAddressFormCollapsed).toBeTrue();
  });

  it('should render an error when supplied', () => {
    const error = makeHttpError({ status: 404 });
    component.error = error;
    component.ngOnChanges();
    fixture.detectChanges();

    expect(element.querySelector('ish-error-message')).toBeTruthy();
  });

  it('should set submitted flag if submit is clicked and form is not valid', async () => {
    component.form = new FormGroup({
      email: new FormControl('', Validators.required),
    });
    expect(component.submitted).toBeFalsy();
    component.submitAddressForm();
    await fixture.whenStable();

    expect(component.submitted).toBeTruthy();
  });

  it('should NOT create address for invalid form', () => {
    component.form = new FormGroup({
      email: new FormControl('', Validators.required),
    });

    component.submitAddressForm();
    fixture.detectChanges();

    verify(checkoutFacade.createBasketAddress(anything(), anything())).never();
  });

  it('should create address for valid invoice address form', () => {
    component.form = fb.group({
      email: new FormControl(''),
      shipOption: new FormControl('shipToInvoiceAddress'),
    });
    component.invoiceAddressForm = fb.group({
      address: new FormControl({}),
    });

    component.submitAddressForm();
    fixture.detectChanges();

    verify(checkoutFacade.createBasketAddress(anything(), anything())).once();
  });
});
