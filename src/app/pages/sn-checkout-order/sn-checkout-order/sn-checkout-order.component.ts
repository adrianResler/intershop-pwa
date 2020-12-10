import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Order } from 'ish-core/models/order/order.model';
import { User } from 'ish-core/models/user/user.model';

@Component({
  selector: 'sn-checkout-order',
  templateUrl: './sn-checkout-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnCheckoutOrderComponent {
  @Input() order: Order;
  @Input() user: User;
}
