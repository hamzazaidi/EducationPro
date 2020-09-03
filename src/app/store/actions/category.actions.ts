import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/Category';


export enum CategoryActionTypes {
  LoadCategories = '[Category] Load Categories',
  LoadCategoriesSuccess = '[Category] Load Categories Success',
  LoadCategoriesFailure = '[Category] Load Categories Failure',
}

export const LoadCategories = createAction(CategoryActionTypes.LoadCategories);
export const LoadCategoriesSuccess = createAction(CategoryActionTypes.LoadCategoriesSuccess, props<{ payload: Category[] }>());
export const LoadCategoriesFailure = createAction(CategoryActionTypes.LoadCategoriesFailure);
