import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';

import { AppFacade } from 'ish-core/facades/app.facade';
import { findAllCustomElements } from 'ish-core/utils/dev/html-query-utils';
import { SnHeaderCheckoutComponent } from 'ish-shell/sn-header/sn-header-checkout/sn-header-checkout.component';
import { SnHeaderDefaultComponent } from 'ish-shell/sn-header/sn-header-default/sn-header-default.component';
import { SnHeaderSimpleComponent } from 'ish-shell/sn-header/sn-header-simple/sn-header-simple.component';

import { SnHeaderComponent } from './sn-header.component';

describe.skip('Sn Header Component', () => {
  let component: SnHeaderComponent;
  let fixture: ComponentFixture<SnHeaderComponent>;
  let element: HTMLElement;
  let appFacade: AppFacade;

  beforeEach(async () => {
    appFacade = mock(AppFacade);
    when(appFacade.headerType$).thenReturn(of(undefined));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MockComponent(SnHeaderCheckoutComponent),
        MockComponent(SnHeaderDefaultComponent),
        MockComponent(SnHeaderSimpleComponent),
        SnHeaderComponent,
      ],
      providers: [{ provide: AppFacade, useFactory: () => instance(appFacade) }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnHeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should render default header component if no headerType is set', () => {
    fixture.detectChanges();
    expect(findAllCustomElements(element)).toMatchInlineSnapshot(`
      Array [
        "sn-header-default",
      ]
    `);
  });

  it('should render simple header component if set', () => {
    when(appFacade.headerType$).thenReturn(of('simple'));
    fixture.detectChanges();
    expect(findAllCustomElements(element)).toMatchInlineSnapshot(`
      Array [
        "sn-header-simple",
      ]
    `);
  });
});
