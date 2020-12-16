import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ProductCompareStatusComponent } from 'ish-shell/header/product-compare-status/product-compare-status.component';

@Component({
  selector: 'sn-product-compare-status',
  templateUrl: './sn-product-compare-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnProductCompareStatusComponent extends ProductCompareStatusComponent implements OnInit {}
