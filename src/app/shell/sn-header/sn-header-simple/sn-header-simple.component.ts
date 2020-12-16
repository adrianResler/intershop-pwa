import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sn-header-simple',
  templateUrl: './sn-header-simple.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnHeaderSimpleComponent {}
