import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockDirective } from 'ng-mocks';
import { Subject } from 'rxjs';
import { anything, instance, mock, when } from 'ts-mockito';

import { ServerHtmlDirective } from 'ish-core/directives/server-html.directive';
import { CookiesService } from 'ish-core/services/cookies/cookies.service';

import { CookieBannerComponent } from './cookie-banner.component';

// tslint:disable:no-intelligence-in-artifacts
describe('Cookie Banner Component', () => {
  let fixture: ComponentFixture<CookieBannerComponent>;
  let element: HTMLElement;
  let component: CookieBannerComponent;
  let cookiesService: CookiesService;

  beforeEach(async(() => {
    cookiesService = mock(CookiesService);
    when(cookiesService.get(anything())).thenReturn(undefined);
    when(cookiesService.openCookieDialog$).thenReturn(new Subject());

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [CookieBannerComponent, MockDirective(ServerHtmlDirective)],
      providers: [{ provide: CookiesService, useFactory: () => instance(cookiesService) }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CookieBannerComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
      });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
