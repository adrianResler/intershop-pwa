import { ChangeDetectionStrategy, Component, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { FormlyForm } from '@ngx-formly/core';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponent, MockDirective, MockPipe } from 'ng-mocks';

import { ServerHtmlDirective } from 'ish-core/directives/server-html.directive';
import { PricePipe } from 'ish-core/models/price/price.pipe';
import { makeHttpError } from 'ish-core/utils/dev/api-service-utils';
import { BasketMockData } from 'ish-core/utils/dev/basket-mock-data';
import { BasketAddressSummaryComponent } from 'ish-shared/components/basket/basket-address-summary/basket-address-summary.component';
import { BasketCostSummaryComponent } from 'ish-shared/components/basket/basket-cost-summary/basket-cost-summary.component';
import { BasketItemsSummaryComponent } from 'ish-shared/components/basket/basket-items-summary/basket-items-summary.component';
import { BasketPromotionCodeComponent } from 'ish-shared/components/basket/basket-promotion-code/basket-promotion-code.component';
import { BasketValidationResultsComponent } from 'ish-shared/components/basket/basket-validation-results/basket-validation-results.component';
import { ErrorMessageComponent } from 'ish-shared/components/common/error-message/error-message.component';
import { CheckboxComponent } from 'ish-shared/forms/components/checkbox/checkbox.component';

import { PaymentConcardisCreditcardCvcDetailComponent } from './payment-concardis-creditcard-cvc-detail/payment-concardis-creditcard-cvc-detail.component';
import { PaymentConcardisCreditcardComponent } from './payment-concardis-creditcard/payment-concardis-creditcard.component';
import { PaymentConcardisDirectdebitComponent } from './payment-concardis-directdebit/payment-concardis-directdebit.component';
import { SnCheckoutPaymentComponent } from './sn-checkout-payment.component';

// TODO: Fix once the implementation is in place
describe.skip('Sn Checkout Payment Component', () => {
  let component: SnCheckoutPaymentComponent;
  let fixture: ComponentFixture<SnCheckoutPaymentComponent>;
  let element: HTMLElement;
  let paymentMethodChange: SimpleChanges;

  beforeEach(async () => {
    @Component({ template: 'dummy' })
    class DummyComponent {}

    await TestBed.configureTestingModule({
      declarations: [
        DummyComponent,
        MockComponent(BasketAddressSummaryComponent),
        MockComponent(BasketCostSummaryComponent),
        MockComponent(BasketItemsSummaryComponent),
        MockComponent(BasketPromotionCodeComponent),
        MockComponent(BasketValidationResultsComponent),
        MockComponent(CheckboxComponent),
        MockComponent(ErrorMessageComponent),
        MockComponent(FormlyForm),
        MockComponent(NgbCollapse),
        MockComponent(PaymentConcardisCreditcardComponent),
        MockComponent(PaymentConcardisCreditcardCvcDetailComponent),
        MockComponent(PaymentConcardisDirectdebitComponent),
        MockDirective(ServerHtmlDirective),
        MockPipe(PricePipe),
        SnCheckoutPaymentComponent,
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'checkout/review', component: DummyComponent }]),
        TranslateModule.forRoot(),
      ],
    })
      .overrideComponent(SnCheckoutPaymentComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnCheckoutPaymentComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.basket = BasketMockData.getBasket();
    component.paymentMethods = [
      {
        id: 'ISH_INVOICE',
        serviceId: 'ISH_INVOICE',
        displayName: 'Invoice',
        saveAllowed: false,
      },
      {
        id: 'Concardis_CreditCard',
        serviceId: 'Concardis_CreditCard',
        displayName: 'Concardis Credit Card',
        saveAllowed: false,
        parameters: [{ key: 'key1', name: 'name' }],
      },
      {
        id: 'ISH_CreditCard',
        serviceId: 'ISH_CreditCard',
        displayName: 'Intershop Credit Card',
        saveAllowed: true,
        parameters: [{ key: 'key1', name: 'name' }],
      },
      BasketMockData.getPaymentMethod(),
    ];
    paymentMethodChange = {
      paymentMethods: new SimpleChange(undefined, component.paymentMethods, false),
    };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should render available payment methods on page', () => {
    component.ngOnChanges(paymentMethodChange);
    fixture.detectChanges();
    expect(element.querySelector('#payment-accordion')).toBeTruthy();
  });

  it('should throw updatePaymentMethod event when the user changes payment selection', done => {
    fixture.detectChanges();

    component.updatePaymentMethod.subscribe(formValue => {
      expect(formValue).toBe('testPayment');
      done();
    });

    component.paymentForm.get('name').setValue('testPayment');
  });

  describe('error display', () => {
    it('should not render an error if no error occurs', () => {
      fixture.detectChanges();
      expect(element.querySelector('[role="alert"]')).toBeFalsy();
    });

    it('should render an error if an error occurs', () => {
      component.error = makeHttpError({ status: 404 });
      fixture.detectChanges();
      expect(element.querySelector('ish-error-message')).toBeTruthy();
    });

    it('should not render an error if the user has currently no payment method selected', () => {
      component.basket.payment = undefined;
      fixture.detectChanges();
      expect(element.querySelector('[role="alert"]')).toBeFalsy();
    });

    it('should render an error if the user clicks next and has currently no payment method selected', () => {
      component.basket.payment = undefined;
      component.goToNextStep();
      fixture.detectChanges();
      expect(element.querySelector('[role="alert"]')).toBeTruthy();
    });
  });

  describe('next button', () => {
    it('should set submitted if next button is clicked', () => {
      expect(component.nextSubmitted).toBeFalsy();
      component.goToNextStep();
      expect(component.nextSubmitted).toBeTruthy();
    });

    it('should not disable next button if basket payment method is set and next button is clicked', () => {
      expect(component.nextDisabled).toBeFalsy();
      component.goToNextStep();
      expect(component.nextDisabled).toBeFalsy();
    });

    it('should disable next button if basket payment method is missing and next button is clicked', () => {
      component.basket.payment = undefined;

      component.goToNextStep();
      expect(component.nextDisabled).toBeTruthy();
    });
  });

  describe('parameter forms', () => {
    it('should open and close payment form if open/cancel form is triggered', () => {
      component.basket.payment = undefined;
      expect(component.formIsOpen(-1)).toBeTruthy();
      component.openPaymentParameterForm(2);
      expect(component.formIsOpen(2)).toBeTruthy();

      component.cancelNewPaymentInstrument();
      expect(component.formIsOpen(-1)).toBeTruthy();
    });

    it('should throw createPaymentInstrument event when the user submits a valid parameter form and saving is not allowed', done => {
      component.basket.payment = undefined;
      component.ngOnChanges(paymentMethodChange);
      component.openPaymentParameterForm(1);

      component.createPaymentInstrument.subscribe(formValue => {
        expect(formValue.paymentInstrument).toEqual({
          paymentMethod: 'Concardis_CreditCard',
          parameters: [{ name: 'creditCardNumber', value: '123' }],
        });
        expect(formValue.saveForLater).toBeFalsy();
        done();
      });

      component.parameterForm.addControl('creditCardNumber', new FormControl('123', Validators.required));
      component.submitParameterForm();
    });

    it('should throw createUserPaymentInstrument event when the user submits a valid parameter form and saving is allowed', done => {
      component.basket.payment = undefined;
      component.ngOnChanges(paymentMethodChange);
      component.openPaymentParameterForm(3);

      component.createPaymentInstrument.subscribe(formValue => {
        expect(formValue.paymentInstrument).toEqual({
          paymentMethod: 'ISH_CreditCard',
          parameters: [{ name: 'creditCardNumber', value: '456' }],
        });
        expect(formValue.saveForLater).toBeTruthy();
        done();
      });

      component.parameterForm.addControl('creditCardNumber', new FormControl('456', Validators.required));
      component.submitParameterForm();
    });

    it('should disable submit button when the user submits an invalid parameter form', () => {
      component.basket.payment = undefined;
      component.openPaymentParameterForm(1);
      fixture.detectChanges();

      expect(component.formSubmitted).toBeFalsy();
      component.parameterForm.addControl('IBAN', new FormControl('', Validators.required));
      component.submitParameterForm();
      expect(component.formSubmitted).toBeTruthy();
    });

    it('should render standard parameter form for standard parametrized form', () => {
      component.basket.payment = undefined;
      component.openPaymentParameterForm(1);

      component.ngOnChanges(paymentMethodChange);
      fixture.detectChanges();
      expect(element.querySelector('formly-form')).toBeTruthy();
    });
  });

  describe('should display selectable and deleteable payment instruments for parametrized payment methods', () => {
    it('should display payment instruments when parametrized payment methods are available', () => {
      component.ngOnChanges(paymentMethodChange);
      fixture.detectChanges();

      expect(element.querySelector('[data-testing-id=payment-parameter-form-ISH_CreditCard]')).toBeTruthy();
      expect(
        element.querySelector('[data-testing-id=payment-parameter-form-ISH_CreditCard] input[type=radio]')
      ).toBeTruthy();
      expect(element.querySelector('[data-testing-id=payment-parameter-form-ISH_CreditCard] a')).toBeTruthy();
    });

    it('should throw deletePaymentInstrument event when the user deletes a payment instrument', done => {
      const paymentInstrument = {
        id: '4321',
        paymentMethod: 'ISH_DirectDebit',
        parameters: [
          {
            name: 'accountHolder',
            value: 'Patricia Miller',
          },
          {
            name: 'IBAN',
            value: 'DE430859340859340',
          },
        ],
      };
      fixture.detectChanges();

      component.deletePaymentInstrument.subscribe(instrument => {
        expect(instrument.id).toEqual(paymentInstrument.id);
        done();
      });
      component.deleteBasketPayment(paymentInstrument);
    });
  });
});