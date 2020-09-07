import { Category } from './Category';

export interface EditableCategory extends Category {
  isEditing: boolean;
}

export interface Menu {
  path: string;
  value: string;
}

export interface SettingsState {
  menu: Menu[];
  categories: {
    isLoading: boolean;
    items: EditableCategory[];
  };
}
