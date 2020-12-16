import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'ish-shared/shared.module';

import { SnCheckoutOrderPageModule } from '../sn-checkout-order/sn-checkout-order-page.module';
import { SnCheckoutReceiptPageModule } from '../sn-checkout-receipt/sn-checkout-receipt-page.module';

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
        component: SnCheckoutReceiptPageModule.component,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'order',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(snCheckoutPageRoutes), SharedModule, SnCheckoutOrderPageModule],
  declarations: [SnCheckoutPageComponent, SnCheckoutProgressBarComponent],
})
export class SnCheckoutPageModule {}
