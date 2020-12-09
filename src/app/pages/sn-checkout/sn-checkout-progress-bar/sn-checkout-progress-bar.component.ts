import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sn-checkout-progress-bar',
  templateUrl: './sn-checkout-progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnCheckoutProgressBarComponent {
  @Input() step = 1;

  /**
   * Define the checkout steps.
   */
  checkoutSteps = [
    {
      step: 1,
      link: '/checkout/order',
      labelKey: 'sn_checkout.progress.order.label',
      stepKey: 'checkout.progress.step1.text',
    },
    {
      step: 2,
      link: '/checkout/receipt',
      labelKey: 'checkout.progress.receipt.label',
      stepKey: 'checkout.progress.step2.text',
    },
  ];

  /**
   * Checks whether a checkout step should be displayed as link or not.
   * @param step  The checkout step to evaluate.
   * @returns     Returns 'true' if the step number is lover than the current step and if the current step is lower than 5.
   */
  checkoutStepLink(step): boolean {
    return step < this.step && this.step < 2;
  }
}
