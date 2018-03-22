import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Customer } from '../../../models/customer/customer.model';
import { LoginUser, LoginUserFail, LoginUserSuccess, LogoutUser } from './user.actions';
import { initialState, userReducer } from './user.reducer';

describe('User Reducer', () => {
  const customer = {
    id: 'dummy'
  } as Customer;

  describe('initialState', () => {
    it('should not have a user when unmodified', () => {
      expect(initialState.customer).toBeNull();
    });

    it('should not have an error when unmodified', () => {
      expect(initialState.error).toBeFalsy();
    });

    it('should not be authorized when unmodified', () => {
      expect(initialState.authorized).toBe(false);
    });
  });

  describe('reducer', () => {
    it('should return initial state when undefined state is supplied', () => {
      const newState = userReducer(undefined, {} as any);

      expect(newState).toEqual(initialState);
    });

    it('should return initial state when undefined action is supplied', () => {
      const newState = userReducer(initialState, {} as any);

      expect(newState).toEqual(initialState);
    });
  });

  describe('Actions', () => {
    it('should set initial state when LoginUser action is reduced', () => {
      const newState = userReducer(initialState, new LoginUser({ userName: 'dummy' }));

      expect(newState).toEqual(initialState);
    });

    it('should set initial when LoginUser action is reduced', () => {
      const newState = userReducer(initialState, new LoginUser({ userName: 'dummy' }));

      expect(newState).toEqual(initialState);
    });

    it('should set error when LoginUserFail action is reduced and error is resetted after route changed', () => {
      const error = { message: 'error' } as any;
      let newState = userReducer(initialState, new LoginUserFail(error));

      expect(newState).toEqual({ ...initialState, error });

      newState = userReducer(newState, { type: ROUTER_NAVIGATION });
      expect(newState.error).toBeUndefined();
    });

    it('should set error when CreateUserFail action is reduced', () => {
      const error = { message: 'error' } as any;
      const newState = userReducer(initialState, new LoginUserFail(error));

      expect(newState).toEqual({ ...initialState, error });
    });

    it('should set customer and authorized when LoginUserSuccess action is reduced', () => {
      const newState = userReducer(initialState, new LoginUserSuccess(customer));

      expect(newState).toEqual({ ...initialState, customer, authorized: true });
    });

    it('should unset authorized and customer when reducing LogoutUser', () => {
      const oldState = { ...initialState, customer, authorized: true };

      const newState = userReducer(oldState, new LogoutUser());

      expect(newState).toEqual({ ...initialState, customer: null, authorized: false });
    });

    it('should unset authorized and customer when reducing LoginUser', () => {
      const oldState = { ...initialState, customer, authorized: true };

      const newState = userReducer(oldState, new LoginUser({ userName: 'dummy' }));

      expect(newState).toEqual({ ...initialState, customer: null, authorized: false });
    });
  });
});