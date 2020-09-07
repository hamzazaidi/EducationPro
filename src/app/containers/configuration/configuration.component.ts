import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/SettingsState';
import { AppState } from 'src/app/models/AppState';
import { Store, select } from '@ngrx/store';
import { selectMenus } from 'src/app/store/selectors/settings.selector';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  menus$: Observable<Menu[]>;
  constructor(private store: Store<AppState>) {
    this.menus$ = this.store.pipe(select(selectMenus));
  }

  ngOnInit() {}
}
