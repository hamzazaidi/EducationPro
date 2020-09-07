import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  concatMap,
  withLatestFrom,
  tap,
  filter,
} from 'rxjs/operators';
import { SettingsActions } from '../actions';
import * as routerSelectors from '../selectors/router.selector';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private categorySvc: CategoryService
  ) {}

  loadCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.LoadCategories),
      switchMap(() => {
        return this.categorySvc.getCategories({ cache: false }).pipe(
          map((categories) =>
            SettingsActions.LoadCategoriesSuccess({
              payload: categories.map((c) => ({ ...c, isEditing: false })),
            })
          )
        );
      }),
      catchError(() => of(SettingsActions.LoadCategoriesFailure()))
    )
  );
}
