import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/Category';
import { EditableCategory } from 'src/app/models/SettingsState';

export enum SettingsActionTypes {
  LoadCategories = '[Category] Load Categories',
  LoadCategoriesSuccess = '[Category] Load Categories Success',
  LoadCategoriesFailure = '[Category] Load Categories Failure',
}

export const LoadCategories = createAction(SettingsActionTypes.LoadCategories);
export const LoadCategoriesSuccess = createAction(
  SettingsActionTypes.LoadCategoriesSuccess,
  props<{ payload: EditableCategory[] }>()
);
export const LoadCategoriesFailure = createAction(
  SettingsActionTypes.LoadCategoriesFailure
);
