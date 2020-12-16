import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { LanguageSwitchComponent } from 'ish-shell/header/language-switch/language-switch.component';

@Component({
  selector: 'sn-language-switch',
  templateUrl: './sn-language-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnLanguageSwitchComponent extends LanguageSwitchComponent implements OnInit {}
