import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { Observable } from 'rxjs';
import { Category } from '../../models/Category';
import { selectLoadingCategories } from '../../store/selectors/settings.selector';
import { selectCategories } from '../../store/selectors/settings.selector';
import { EditableCategory } from 'src/app/models/SettingsState';
import { SettingsActions } from 'src/app/store/actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  addForm: FormGroup;
  editForm: FormGroup;
  categories$: Observable<EditableCategory[]>;
  loadingCategories$: Observable<boolean>;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.addForm = this.fb.group({
      area: ['', { validators: [Validators.required] }],
      name: ['', { validators: [Validators.required] }],
    });

    this.editForm = this.fb.group({
      area: ['', { validators: [Validators.required] }],
      name: ['', { validators: [Validators.required] }],
    });

    this.categories$ = this.store.pipe(select(selectCategories));
    this.loadingCategories$ = this.store.pipe(select(selectLoadingCategories));
  }

  ngOnInit() {
    this.store.dispatch(SettingsActions.LoadCategories());
  }

  toggle(category: EditableCategory) {
    this.store.dispatch(
      SettingsActions.ToggleEditCategory({ payload: category })
    );
  }
}
