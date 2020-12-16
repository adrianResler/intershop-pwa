import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';

import { ProductImageComponent } from 'ish-shell/header/product-image/product-image.component';

@Component({
  selector: 'sn-product-image',
  templateUrl: './sn-product-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnProductImageComponent extends ProductImageComponent implements OnChanges {}
