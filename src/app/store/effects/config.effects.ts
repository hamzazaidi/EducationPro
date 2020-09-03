import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, concatMap, withLatestFrom, tap, filter, take } from 'rxjs/operators';
import { ConfigActions, RouterActions } from '../actions';
import * as routerSelectors from '../selectors/router.selector';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { Area } from '../../models/ConfigState';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class ConfigEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authSvc: AuthService
  ) {}

  setArea$ = createEffect(() => this.actions$.pipe(
      ofType(ConfigActions.SetArea),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(routerSelectors.selectRouteParams)))
      )),
      map(([action, { area }]) => ConfigActions.SetAreaSuccess({ payload: area as Area }))
  ));

  authenticateUser$ = createEffect(() => this.actions$.pipe(
      ofType(ConfigActions.AuthenticateUser),
      switchMap(() => this.authSvc.user$),
      take(1),
      tap((user) => (user) ? null : this.authSvc.googleSignin()),
      switchMap(() => {
        return this.authSvc.user$.pipe(
          mergeMap(user => {
            if (user) {
              return [
                ConfigActions.AuthenticateUserSuccess({ payload: user }),
                RouterActions.Go({ payload: { path: ['/quiz'] } })
              ];
            } else {
              return [];
            }
          })
        );
      }),
      catchError(() => of(ConfigActions.AuthenticateUserFailure()))
  ));

  logoutUser$ = createEffect(() => this.actions$.pipe(
      ofType(ConfigActions.LogoutUser),
      switchMap(() => this.authSvc.user$),
      take(1),
      tap((user) => (user) ? this.authSvc.signOut() : null),
      mergeMap(() => [ConfigActions.LogoutUserSuccess(), RouterActions.Go({ payload: { path: ['/'] } })]),
      catchError(() => of(ConfigActions.AuthenticateUserFailure()))
  ));
}
