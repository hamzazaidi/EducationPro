import { Component, VERSION, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './models/AppState';
import { selectUser, selectIsAuthenticated } from './store/selectors/config.selector';
import { ConfigActions, RouterActions } from './store/actions';
import { User } from './models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User>;
  isAuthenticated$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.user$ = this.store.pipe(select(selectUser));
  }

  onLogout() {
    this.store.dispatch(ConfigActions.LogoutUser());
  }

  onSettings() {
    this.store.dispatch(RouterActions.Go({ payload: { path: ['/settings'] } }));
  }
}
