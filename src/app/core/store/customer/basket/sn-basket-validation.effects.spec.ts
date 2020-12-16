import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { cold, hot } from 'jest-marbles';
import { Observable, noop, of, throwError } from 'rxjs';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import { BasketValidation } from 'ish-core/models/basket-validation/basket-validation.model';
import { Product } from 'ish-core/models/product/product.model';
import { BasketService } from 'ish-core/services/basket/basket.service';
import { CoreStoreModule } from 'ish-core/store/core/core-store.module';
import { createOrder } from 'ish-core/store/customer/orders';
import { loadProductSuccess } from 'ish-core/store/shopping/products';
import { makeHttpError } from 'ish-core/utils/dev/api-service-utils';
import { BasketMockData } from 'ish-core/utils/dev/basket-mock-data';

import {
  continueCheckout,
  continueCheckoutFail,
  continueCheckoutSuccess,
  continueCheckoutWithIssues,
  loadBasketSuccess,
  validateBasket,
} from './basket.actions';
import { SnBasketValidationEffects } from './sn-basket-validation.effects';

describe('Sn Basket Validation Effects', () => {
  let actions$: Observable<Action>;
  let basketServiceMock: BasketService;
  let effects: SnBasketValidationEffects;
  let store$: Store;
  let location: Location;

  @Component({ template: 'dummy' })
  class DummyComponent {}

  beforeEach(() => {
    basketServiceMock = mock(BasketService);

    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      imports: [
        CoreStoreModule.forTesting(),
        RouterTestingModule.withRoutes([
          { path: 'checkout', children: [{ path: 'order', component: DummyComponent }] },
        ]),
      ],
      providers: [
        SnBasketValidationEffects,
        provideMockActions(() => actions$),
        { provide: BasketService, useFactory: () => instance(basketServiceMock) },
      ],
    });

    effects = TestBed.inject(SnBasketValidationEffects);
    store$ = TestBed.inject(Store);
    location = TestBed.inject(Location);
  });

  describe('validateBasket$', () => {
    const basketValidation: BasketValidation = {
      basket: BasketMockData.getBasket(),
      results: {
        valid: true,
        adjusted: false,
      },
    };

    beforeEach(() => {
      when(basketServiceMock.validateBasket(anything())).thenReturn(of(basketValidation));

      store$.dispatch(
        loadBasketSuccess({
          basket: BasketMockData.getBasket(),
        })
      );
      store$.dispatch(loadProductSuccess({ product: { sku: 'SKU' } as Product }));
    });

    it('should call the basketService for validateBasket', done => {
      const action = validateBasket({ scopes: ['Products'] });
      actions$ = of(action);

      effects.validateBasket$.subscribe(() => {
        verify(basketServiceMock.validateBasket(anything())).once();
        done();
      });
    });

    it('should map to action of type ContinueCheckoutSuccess', () => {
      const action = validateBasket({ scopes: ['Products'] });
      const completion = continueCheckoutSuccess({
        targetRoute: undefined,
        basketValidation,
      });
      actions$ = hot('-a', { a: action });
      const expected$ = cold('-c', { c: completion });

      expect(effects.validateBasket$).toBeObservable(expected$);
    });

    it('should map invalid request to action of type ContinueCheckoutFail', () => {
      when(basketServiceMock.validateBasket(anything())).thenReturn(throwError(makeHttpError({ message: 'invalid' })));

      const action = validateBasket({ scopes: ['Products'] });
      const completion = continueCheckoutFail({ error: makeHttpError({ message: 'invalid' }) });
      actions$ = hot('-a', { a: action });
      const expected$ = cold('-c', { c: completion });

      expect(effects.validateBasket$).toBeObservable(expected$);
    });

    it('should map to action of type ContinueCheckoutWithIssues if basket is not valid', () => {
      const action = validateBasket({ scopes: ['Products'] });
      basketValidation.results.valid = false;
      const completion = continueCheckoutWithIssues({
        targetRoute: undefined,
        basketValidation,
      });
      actions$ = hot('-a', { a: action });
      const expected$ = cold('-c', { c: completion });

      expect(effects.validateBasket$).toBeObservable(expected$);
    });
  });

  describe('validateBasketAndContinueCheckout$', () => {
    const basketValidation: BasketValidation = {
      basket: BasketMockData.getBasket(),
      results: {
        valid: true,
        adjusted: false,
      },
    };

    beforeEach(() => {
      when(basketServiceMock.validateBasket(anything())).thenReturn(of(basketValidation));

      store$.dispatch(
        loadBasketSuccess({
          basket: BasketMockData.getBasket(),
        })
      );
      store$.dispatch(loadProductSuccess({ product: { sku: 'SKU' } as Product }));
    });

    it('should call the basketService for validateBasketAndContinueCheckout', done => {
      const action = continueCheckout({ targetStep: 1 });
      actions$ = of(action);

      effects.validateBasketAndContinueCheckout$.subscribe(() => {
        verify(basketServiceMock.validateBasket(anything())).once();
        done();
      });
    });

    it('should map to action of type ContinueCheckoutSuccess if targetStep is not 2 (order creation)', () => {
      const action = continueCheckout({ targetStep: 1 });
      const completion = continueCheckoutSuccess({
        targetRoute: '/checkout/order',
        basketValidation,
      });
      actions$ = hot('-a-a-a', { a: action });
      const expected$ = cold('-c-c-c', { c: completion });

      expect(effects.validateBasketAndContinueCheckout$).toBeObservable(expected$);
    });

    it('should map to action of type CreateOrder if targetStep is 2 (order creation)', () => {
      const action = continueCheckout({ targetStep: 2 });
      const completion1 = createOrder();
      const completion2 = continueCheckoutSuccess({ targetRoute: undefined, basketValidation });
      actions$ = hot('-a----a----a', { a: action });
      const expected$ = cold('-(cd)-(cd)-(cd)', { c: completion1, d: completion2 });

      expect(effects.validateBasketAndContinueCheckout$).toBeObservable(expected$);
    });

    it('should map invalid request to action of type ContinueCheckoutFail', () => {
      when(basketServiceMock.validateBasket(anything())).thenReturn(throwError(makeHttpError({ message: 'invalid' })));

      const action = continueCheckout({ targetStep: 1 });
      const completion = continueCheckoutFail({ error: makeHttpError({ message: 'invalid' }) });
      actions$ = hot('-a', { a: action });
      const expected$ = cold('-c', { c: completion });

      expect(effects.validateBasketAndContinueCheckout$).toBeObservable(expected$);
    });

    it('should navigate to the next checkout route after ContinueCheckoutSuccess if the basket is valid', fakeAsync(() => {
      const action = continueCheckoutSuccess({ targetRoute: '/checkout/order', basketValidation });
      actions$ = of(action);

      effects.jumpToNextCheckoutStep$.subscribe(noop, fail, noop);

      tick(500);

      expect(location.path()).toEqual('/checkout/order');
    }));

    it('should navigate to the error related route after ContinueCheckoutWithIssues if the basket is not valid', fakeAsync(() => {
      const basketValidationWithIssue: BasketValidation = {
        basket: BasketMockData.getBasket(),
        results: {
          valid: false,
          adjusted: false,
          errors: [{ code: '1234', message: 'error', parameters: { scopes: 'Addresses' } }],
        },
      };
      const action = continueCheckoutWithIssues({
        targetRoute: 'auto',
        basketValidation: basketValidationWithIssue,
      });
      actions$ = of(action);

      effects.jumpToNextCheckoutStep$.subscribe(noop, fail, noop);

      tick(500);

      expect(location.path()).toEqual('/checkout/order?error=true');
    }));

    it('should map to action of type ContinueCheckoutWithIssues if basket is not valid', () => {
      const action = continueCheckout({ targetStep: 1 });
      basketValidation.results.valid = false;
      const completion = continueCheckoutWithIssues({
        targetRoute: '/checkout/order',
        basketValidation,
      });
      actions$ = hot('-a', { a: action });
      const expected$ = cold('-c', { c: completion });

      expect(effects.validateBasketAndContinueCheckout$).toBeObservable(expected$);
    });
  });
});