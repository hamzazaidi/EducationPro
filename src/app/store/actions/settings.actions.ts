import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/Category';
import { EditableCategory } from 'src/app/models/SettingsState';

export enum SettingsActionTypes {
  LoadCategories = '[Category] Load Categories',
  LoadCategoriesSuccess = '[Category] Load Categories Success',
  LoadCategoriesFailure = '[Category] Load Categories Failure',
  ToggleEditCategory = '[Toggle Edit Category] ToggleEdit the Category',
  SaveCategory = '[Category] Save category',
  SaveCategorySuccess = '[Category] Save category success',
  SaveCategoryFailure = '[Category] Save category failure',
  EditCategory = '[Category] Edit category',
  EditCategorySuccess = '[Category] Edit category success',
  EditCategoryFailure = '[Category] Edit category failure',
  DeleteCategory = '[Category] Delete category',
  DeleteCategorySuccess = '[Category] Delete category success',
  DeleteCategoryFailure = '[Category] Delete category failure',
}

export const LoadCategories = createAction(SettingsActionTypes.LoadCategories);
export const LoadCategoriesSuccess = createAction(
  SettingsActionTypes.LoadCategoriesSuccess,
  props<{ payload: EditableCategory[] }>()
);
export const LoadCategoriesFailure = createAction(
  SettingsActionTypes.LoadCategoriesFailure
);

export const ToggleEditCategory = createAction(
  SettingsActionTypes.ToggleEditCategory,
  props<{ payload: EditableCategory }>()
);

export const SaveCategory = createAction(
  SettingsActionTypes.SaveCategory,
  props<{ payload: EditableCategory }>()
);
export const SaveCategorySuccess = createAction(
  SettingsActionTypes.SaveCategorySuccess,
  props<{ payload: EditableCategory }>()
);
export const SaveCategoryFailure = createAction(
  SettingsActionTypes.SaveCategoryFailure
);

export const EditCategory = createAction(
  SettingsActionTypes.EditCategory,
  props<{ payload: EditableCategory }>()
);
export const EditCategorySuccess = createAction(
  SettingsActionTypes.EditCategorySuccess,
  props<{ payload: EditableCategory }>()
);
export const EditCategoryFailure = createAction(
  SettingsActionTypes.EditCategoryFailure
);

export const DeleteCategory = createAction(
  SettingsActionTypes.DeleteCategory,
  props<{ payload: EditableCategory }>()
);
export const DeleteCategorySuccess = createAction(
  SettingsActionTypes.DeleteCategorySuccess,
  props<{ payload: EditableCategory }>()
);
export const DeleteCategoryFailure = createAction(
  SettingsActionTypes.DeleteCategoryFailure
);
