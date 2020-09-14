import { createReducer, on } from '@ngrx/store';
import { SettingsState } from '../../models/SettingsState';
import { SettingsActions } from '../actions';

export const initialState: SettingsState = {
  menu: [
    { path: 'category', value: 'Category' },
    { path: 'sub-category', value: 'Sub-category' },
    { path: 'quiz', value: 'Quizes' },
  ],
  categories: {
    isLoading: false,
    items: [],
  },
};

export const reducer = createReducer(
  initialState,
  on(
    SettingsActions.LoadCategories,
    (state: SettingsState): SettingsState => {
      return {
        ...state,
        categories: {
          ...state.categories,
          isLoading: true,
        },
      };
    }
  ),
  on(
    SettingsActions.LoadCategoriesSuccess,
    (state: SettingsState, { payload }): SettingsState => {
      return {
        ...state,
        categories: {
          items: [...payload],
          isLoading: false,
        },
      };
    }
  ),
  on(
    SettingsActions.LoadCategoriesFailure,
    (state: SettingsState): SettingsState => {
      return {
        ...state,
        categories: {
          items: [],
          isLoading: false,
        },
      };
    }
  ),
  on(
    SettingsActions.ToggleEditCategory,
    (state: SettingsState, { payload }): SettingsState => {
      console.log('Payload ==>', payload);
      return {
        ...state,
        categories: {
          ...state.categories,
          items: [
            ...state.categories.items.map((c) => ({
              ...c,
              isEditing: c.key === payload.key && !c.isEditing,
            })),
          ],
        },
      };
    }
  )
);
