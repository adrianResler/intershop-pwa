import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { USER_REGISTRATION_SUBSCRIBE_TO_NEWSLETTER } from '../../../../core/configurations/injection-keys';
import { SpecialValidators } from '../../../../shared/validators/special-validators';

@Component({
  selector: 'is-registration-credentials-form',
  templateUrl: './registration-credentials-form.component.html'
})

export class RegistrationCredentialsFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  credentialsForm: FormGroup;

  constructor(
    @Inject(USER_REGISTRATION_SUBSCRIBE_TO_NEWSLETTER) public emailOptIn: boolean,
    private fb: FormBuilder,                    // <--- inject FormBuilder
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  // create the credentials form and add it to the parent form
  createForm() {
    const formGroup = {
      login: ['', [Validators.required, Validators.email]],
      loginConfirmation: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, SpecialValidators.password]],
      passwordConfirmation: ['', [Validators.required, SpecialValidators.password]],
      securityQuestion: ['', [Validators.required]],
      securityQuestionAnswer: ['', [Validators.required]]
    };
    if (this.emailOptIn) {
      formGroup['newsletter'] = [true];
    }
    this.credentialsForm = this.fb.group(formGroup);

    this.credentialsForm.get('loginConfirmation').setValidators(CustomValidators.equalTo(this.credentialsForm.get('login')));
    this.credentialsForm.get('passwordConfirmation').setValidators(CustomValidators.equalTo(this.credentialsForm.get('password')));

    // add newsletter check only if emailOptin = true
    this.parentForm.addControl('credentials', this.credentialsForm);
  }
}