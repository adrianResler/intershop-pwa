import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { SnCheckoutAddressAnonymousComponent } from './sn-checkout-address-anonymous/sn-checkout-address-anonymous.component';
import { SnCheckoutAddressComponent } from './sn-checkout-address/sn-checkout-address.component';
import { SnCheckoutOrderPageComponent } from './sn-checkout-order-page.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SnCheckoutAddressAnonymousComponent, SnCheckoutAddressComponent, SnCheckoutOrderPageComponent],
})
export class SnCheckoutOrderPageModule {
  static component = SnCheckoutOrderPageComponent;
}
