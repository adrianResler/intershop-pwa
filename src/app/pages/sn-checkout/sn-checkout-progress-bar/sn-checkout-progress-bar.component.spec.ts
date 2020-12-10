import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponent } from 'ng-mocks';

import { SnCheckoutProgressBarComponent } from './sn-checkout-progress-bar.component';

describe('Sn Checkout Progress Bar Component', () => {
  let component: SnCheckoutProgressBarComponent;
  let fixture: ComponentFixture<SnCheckoutProgressBarComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [MockComponent(FaIconComponent), SnCheckoutProgressBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnCheckoutProgressBarComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  // TODO: Tests to fix once I'll create the right order component
  xit('should display 1 link (to receipe page) if step = 1 (order)', () => {
    component.step = 1;
    fixture.detectChanges();
    expect(element.querySelectorAll('li a')).toHaveLength(1);
  });

  it('should not display any links if basket step = 2 (receipt)', () => {
    component.step = 2;
    fixture.detectChanges();
    expect(element.querySelectorAll('li a')).toHaveLength(0);
  });
});
