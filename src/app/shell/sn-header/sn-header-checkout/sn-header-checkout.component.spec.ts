import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { findAllCustomElements } from 'ish-core/utils/dev/html-query-utils';
import { SnLoginStatusComponent } from 'ish-shell/sn-header/sn-login-status/sn-login-status.component';

import { SnHeaderCheckoutComponent } from './sn-header-checkout.component';

describe.skip('Sn Header Checkout Component', () => {
  let component: SnHeaderCheckoutComponent;
  let fixture: ComponentFixture<SnHeaderCheckoutComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent(SnLoginStatusComponent), SnHeaderCheckoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnHeaderCheckoutComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should render login status container for logout link', () => {
    expect(findAllCustomElements(element)).toContain('sn-login-status');
  });

  it('should render home link for navigation to home page', () => {
    fixture.detectChanges();
    expect(element.querySelector('a[data-testing-id=link-home]')).toBeTruthy();
  });
});
