import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockDirective } from 'ng-mocks';
import { Subject } from 'rxjs';
import { instance, mock } from 'ts-mockito';

import { ServerHtmlDirective } from 'ish-core/directives/server-html.directive';
import { CookiesService } from 'ish-core/services/cookies/cookies.service';

import { CookieBannerOptions } from '../../models/cookie-banner-options.model';

import { CookieBannerModalComponent } from './cookie-banner-modal.component';

// tslint:disable:no-intelligence-in-artifacts
describe('Cookie Banner Modal Component', () => {
  let fixture: ComponentFixture<CookieBannerModalComponent>;
  let element: HTMLElement;
  let component: CookieBannerModalComponent;
  let cookiesService: CookiesService;
  let openCookieDialog$: Subject<boolean>;

  beforeEach(async(() => {
    cookiesService = mock(cookiesService);
    openCookieDialog$ = new Subject();
    cookiesService = instance(mock(cookiesService));

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [CookieBannerModalComponent, MockDirective(ServerHtmlDirective)],
      providers: [
        {
          provide: CookiesService,
          useFactory: () => ({ openCookieDialog$ } as Partial<CookiesService>),
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CookieBannerModalComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
      });
  }));

  it('should be created', () => {
    component.options = {
      options: [
        {
          id: 'required',
          required: true,
          messageKeyTitle: 'foo.bar',
          messageKeyContent: 'bar.foo',
          whitelistedCookies: ['apiToken'],
        },
      ],
    } as CookieBannerOptions;
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
