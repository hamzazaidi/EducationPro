import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/Category';


export enum SettingsActionTypes {
  LoadCategories = '[Category] Load Categories',
  LoadCategoriesSuccess = '[Category] Load Categories Success',
  LoadCategoriesFailure = '[Category] Load Categories Failure',
}

export const LoadCategories = createAction(SettingsActionTypes.LoadCategories);
export const LoadCategoriesSuccess = createAction(SettingsActionTypes.LoadCategoriesSuccess, props<{ payload: Category[] }>());
export const LoadCategoriesFailure = createAction(SettingsActionTypes.LoadCategoriesFailure);
