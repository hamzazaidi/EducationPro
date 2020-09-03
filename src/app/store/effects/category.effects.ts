import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, concatMap, withLatestFrom, tap, filter } from 'rxjs/operators';
import { CategoryActions } from '../actions';
import * as routerSelectors from '../selectors/router.selector'
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { Area } from '../../models/ConfigState';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private categorySvc: CategoryService
  ) {}

  
  loadCategory$ = createEffect(() => this.actions$.pipe(    
      ofType(CategoryActions.LoadCategories),      
      switchMap(() => {
        return this.categorySvc.getCategories({ cache: true }).pipe(
          map(categories => CategoryActions.LoadCategoriesSuccess({ payload: categories }))
        )
      }),
      catchError(() => of(CategoryActions.LoadCategoriesFailure()))
  ));  
}