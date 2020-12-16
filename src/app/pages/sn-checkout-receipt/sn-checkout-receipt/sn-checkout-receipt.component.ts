import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Order } from 'ish-core/models/order/order.model';
import { User } from 'ish-core/models/user/user.model';

@Component({
  selector: 'sn-checkout-receipt',
  templateUrl: './sn-checkout-receipt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnCheckoutReceiptComponent {
  @Input() order: Order;
  @Input() user: User;
}
