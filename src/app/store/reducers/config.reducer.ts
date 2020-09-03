import { ConfigState, Area } from '../../models/ConfigState';
import { createReducer, on } from '@ngrx/store';
import { ConfigActions } from '../actions';

export const initialState: ConfigState = {
  area: Area.GeneralKnowledge,
  isAuthenticated: false,
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
    roles: {}
  }
};


export const reducer = createReducer(
  initialState,
  on(ConfigActions.SetAreaSuccess, (state, { payload }) => {
    return {
      ...state,
      area: payload
    };
  }),
  on(ConfigActions.AuthenticateUserSuccess, (state, { payload }) => {
    return {
      ...state,
      isAuthenticated: !!payload,
      user: !!payload ? { ...payload } : { ...initialState.user }
    };
  }),
  on(ConfigActions.AuthenticateUserFailure, (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: { ...initialState.user }
    };
  }),
  on(ConfigActions.SetUser, (state, { payload }) => {
    return {
      ...state,
      isAuthenticated: true,
      user: {
        ...initialState.user,
        displayName: payload
      }
    };
  }),
  on(ConfigActions.LogoutUserSuccess, (state) => {
    return {
      ...initialState
    };
  })
);


