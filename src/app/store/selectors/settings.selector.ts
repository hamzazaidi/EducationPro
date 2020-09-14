import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResultState } from '../../models/ResultState';
import { Category } from '../../models/Category';
import * as firebase from 'firebase';
import { SettingsState } from '../../models/SettingsState';

const getSettingsState = createFeatureSelector<SettingsState>('settings');

export const selectMenus = createSelector(
  getSettingsState,
  (state: SettingsState) => state.menu
);

export const selectLoadingCategories = createSelector(
  getSettingsState,
  (state: SettingsState) => state.categories.isLoading
);

export const selectCategories = createSelector(
  getSettingsState,
  (state: SettingsState) =>
    state.categories.items.filter((i) => i.parent === '-1')
);
