import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserInformationMobileComponent } from 'ish-shell/header/user-information-mobile/user-information-mobile.component';

@Component({
  selector: 'sn-user-information-mobile',
  templateUrl: './sn-user-information-mobile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnUserInformationMobileComponent extends UserInformationMobileComponent {}
