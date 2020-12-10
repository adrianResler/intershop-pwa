import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { SnCheckoutOrderPageComponent } from './sn-checkout-order-page.component';
import { SnCheckoutOrderComponent } from './sn-checkout-order/sn-checkout-order.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SnCheckoutOrderComponent, SnCheckoutOrderPageComponent],
})
export class SnCheckoutOrderPageModule {
  static component = SnCheckoutOrderPageComponent;
}
