import { NgModule } from '@angular/core';

import { SharedModule } from 'ish-shared/shared.module';

import { SnCheckoutReceiptPageComponent } from './sn-checkout-receipt-page.component';
import { SnCheckoutReceiptComponent } from './sn-checkout-receipt/sn-checkout-receipt.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SnCheckoutReceiptComponent, SnCheckoutReceiptPageComponent],
})
export class SnCheckoutReceiptPageModule {
  static component = SnCheckoutReceiptPageComponent;
}
