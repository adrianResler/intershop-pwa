import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppFacade } from 'ish-core/facades/app.facade';
import { DeviceType } from 'ish-core/models/viewtype/viewtype.types';

@Component({
  selector: 'sn-header',
  templateUrl: './sn-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnHeaderComponent implements OnInit {
  headerType$: Observable<string>;
  deviceType$: Observable<DeviceType>;
  isSticky$: Observable<boolean>;
  reset$: Observable<Event>;

  constructor(private appFacade: AppFacade, private router: Router) {}

  ngOnInit() {
    this.headerType$ = this.appFacade.headerType$;
    this.deviceType$ = this.appFacade.deviceType$;
    this.isSticky$ = this.appFacade.stickyHeader$;
    this.reset$ = this.router.events.pipe(filter(event => event instanceof NavigationStart));
  }
}
