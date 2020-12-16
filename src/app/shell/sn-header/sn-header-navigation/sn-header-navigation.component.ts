import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { HeaderNavigationComponent } from 'ish-shell/header/header-navigation/header-navigation.component';

@Component({
  selector: 'sn-header-navigation',
  templateUrl: './sn-header-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnHeaderNavigationComponent extends HeaderNavigationComponent implements OnInit {}
