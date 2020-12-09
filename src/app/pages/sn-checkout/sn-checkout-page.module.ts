import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'ish-shared/shared.module';

import { CheckoutReceiptPageModule } from '../checkout-receipt/checkout-receipt-page.module';
import { SnCheckoutOrderPageModule } from '../sn-checkout-order/sn-checkout-order-page.module';

import { SnCheckoutPageComponent } from './sn-checkout-page.component';
import { SnCheckoutProgressBarComponent } from './sn-checkout-progress-bar/sn-checkout-progress-bar.component';

const snCheckoutPageRoutes: Routes = [
  {
    path: '',
    component: SnCheckoutPageComponent,
    children: [
      {
        path: 'order',
        data: { checkoutStep: 1 },
        component: SnCheckoutOrderPageModule.component,
      },
      {
        path: 'receipt',
        data: { checkoutStep: 2 },
        component: CheckoutReceiptPageModule.component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(snCheckoutPageRoutes), SharedModule],
  declarations: [SnCheckoutPageComponent, SnCheckoutProgressBarComponent],
})
export class SnCheckoutPageModule {}
