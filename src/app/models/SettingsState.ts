import { Category } from './Category';

export interface SettingsState {
  categories: {
    isLoading: boolean,
    items: Category[]
  };
}
