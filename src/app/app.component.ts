import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppFacade } from 'ish-core/facades/app.facade';
import { DeviceType } from 'ish-core/models/viewtype/viewtype.types';

/**
 * The App Component provides the application frame for the single page application.
 * In addition to the page structure (header, main section, footer)
 * it holds the global functionality to present a cookie acceptance banner.
 */
@Component({
  selector: 'ish-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('cookie', { static: true })
  isBrowser: boolean;
  wrapperClasses$: Observable<string[]>;
  deviceType$: Observable<DeviceType>;
  isCheckout = false;
  private destroy$ = new Subject();
  constructor(private appFacade: AppFacade, @Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.deviceType$ = this.appFacade.deviceType$;
    this.wrapperClasses$ = this.appFacade.appWrapperClasses$;
    this.appFacade.headerType$.pipe(takeUntil(this.destroy$)).subscribe(type => {
      if (type === 'checkout') {
        this.isCheckout = true;
      } else {
        this.isCheckout = false;
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
