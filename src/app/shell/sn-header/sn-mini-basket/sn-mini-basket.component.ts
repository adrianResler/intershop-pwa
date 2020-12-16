import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MiniBasketComponent } from 'ish-shell/header/mini-basket/mini-basket.component';

@Component({
  selector: 'sn-mini-basket',
  templateUrl: './sn-mini-basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnMiniBasketComponent extends MiniBasketComponent {}
