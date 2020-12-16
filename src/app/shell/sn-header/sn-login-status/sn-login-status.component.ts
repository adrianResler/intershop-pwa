import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { LoginStatusComponent } from 'ish-shell/header/login-status/login-status.component';

@Component({
  selector: 'sn-login-status',
  templateUrl: './sn-login-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnLoginStatusComponent extends LoginStatusComponent implements OnInit {}
