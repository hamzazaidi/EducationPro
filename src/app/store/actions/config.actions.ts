import { createAction, props } from '@ngrx/store';
import { Area } from '../../models/ConfigState';
import { User } from '../../models/User';


export enum ConfigActionTypes {
  SetUser = '[User] Set User name',
  SetArea = '[Config] Set User Area',
  SetAreaSuccess = '[Config] Set User Area Success',
  AuthenticateUser = '[Config] Authenticate user',
  AuthenticateUserSuccess = '[Config] Authenticate user Success',
  AuthenticateUserFailure = '[Config] Authenticate user Failure',
  LogoutUser = '[Config] Logout user',
  LogoutUserSuccess = '[Config] Logout user Success'
}


export const SetUser = createAction(ConfigActionTypes.SetUser, props<{ payload: 'string' }>());

export const SetArea = createAction(ConfigActionTypes.SetArea);

export const SetAreaSuccess = createAction(ConfigActionTypes.SetAreaSuccess, props<{ payload: Area }>());

export const AuthenticateUser = createAction(ConfigActionTypes.AuthenticateUser);

export const AuthenticateUserSuccess = createAction(ConfigActionTypes.AuthenticateUserSuccess, props<{ payload: User }>());

export const AuthenticateUserFailure = createAction(ConfigActionTypes.AuthenticateUserFailure);

export const LogoutUser = createAction(ConfigActionTypes.LogoutUser);

export const LogoutUserSuccess = createAction(ConfigActionTypes.LogoutUserSuccess);
