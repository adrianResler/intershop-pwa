import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponent } from 'ng-mocks';
import { anything, spy, verify } from 'ts-mockito';

import { User } from 'ish-core/models/user/user.model';
import { InputComponent } from '../../../../shared/forms/components/input/input.component';
import { SelectLanguageComponent } from '../../../../shared/forms/components/select-language/select-language.component';
import { SelectTitleComponent } from '../../../../shared/forms/components/select-title/select-title.component';

import { AccountProfileUserPageComponent } from './account-profile-user-page.component';

describe('Account Profile User Page Component', () => {
  let component: AccountProfileUserPageComponent;
  let fixture: ComponentFixture<AccountProfileUserPageComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [
        AccountProfileUserPageComponent,
        MockComponent(InputComponent),
        MockComponent(SelectLanguageComponent),
        MockComponent(SelectTitleComponent),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountProfileUserPageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should display 3 input fields for firstName, lastName and phone', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('ish-input')).toHaveLength(3);
  });

  it('should display select box for title', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('ish-select-title')).toHaveLength(1);
  });

  it('should display select box for language', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('ish-select-language')).toHaveLength(1);
  });

  it('should emit updateUserProfile event if form is valid', () => {
    const eventEmitter$ = spy(component.updateUserProfile);

    component.countryCode = 'US';
    component.currentUser = { firstName: 'Patricia', lastName: 'Miller' } as User;
    fixture.detectChanges();

    component.submit();

    verify(eventEmitter$.emit(anything())).once();
  });

  it('should not emit updateUserProfile event if form is invalid', () => {
    const eventEmitter$ = spy(component.updateUserProfile);
    fixture.detectChanges();

    component.submit();

    verify(eventEmitter$.emit(anything())).never();
  });

  it('should disable submit button when the user submits an invalid form', () => {
    fixture.detectChanges();

    expect(component.submitted).toBeFalse();
    component.submit();
    expect(component.submitted).toBeTrue();
  });
});
