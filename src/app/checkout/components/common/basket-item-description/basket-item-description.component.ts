import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BasketItem } from '../../../../models/basket-item/basket-item.model';

@Component({
  selector: 'ish-basket-item-description',
  templateUrl: './basket-item-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketItemDescriptionComponent {
  @Input() pli: BasketItem;
}