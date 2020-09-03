import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { map, tap, take } from 'rxjs/operators';
import { RouterActions, ConfigActions } from '../store/actions';
import { selectIsAuthenticated } from '../store/selectors/config.selector';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateAdminGuard implements CanActivate {
  constructor(private store: Store<AppState>, private authSvc: AuthService) {

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      tap(user => {
        if (user) {
          this.store.dispatch(ConfigActions.AuthenticateUserSuccess({ payload: user }));
        }
      }),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          this.store.dispatch(RouterActions.Go({ payload: { path: ['/'] } }));
        }
      })
    );
  }
}
