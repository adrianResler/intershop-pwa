import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { SnCheckoutAddressAnonymousComponent } from './sn-checkout-address-anonymous/sn-checkout-address-anonymous.component';
import { SnCheckoutAddressComponent } from './sn-checkout-address/sn-checkout-address.component';
import { SnCheckoutOrderPageComponent } from './sn-checkout-order-page.component';
import { PaymentConcardisCreditcardCvcDetailComponent } from './sn-checkout-payment/payment-concardis-creditcard-cvc-detail/payment-concardis-creditcard-cvc-detail.component';
import { PaymentConcardisCreditcardComponent } from './sn-checkout-payment/payment-concardis-creditcard/payment-concardis-creditcard.component';
import { PaymentConcardisDirectdebitComponent } from './sn-checkout-payment/payment-concardis-directdebit/payment-concardis-directdebit.component';
import { PaymentConcardisComponent } from './sn-checkout-payment/payment-concardis/payment-concardis.component';
import { SnCheckoutPaymentComponent } from './sn-checkout-payment/sn-checkout-payment.component';
import { SnCheckoutShippingComponent } from './sn-checkout-shipping/sn-checkout-shipping.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    PaymentConcardisComponent,
    PaymentConcardisCreditcardComponent,
    PaymentConcardisCreditcardCvcDetailComponent,
    PaymentConcardisDirectdebitComponent,
    SnCheckoutAddressAnonymousComponent,
    SnCheckoutAddressComponent,
    SnCheckoutOrderPageComponent,
    SnCheckoutPaymentComponent,
    SnCheckoutShippingComponent,
  ],
})
export class SnCheckoutOrderPageModule {
  static component = SnCheckoutOrderPageComponent;
}
