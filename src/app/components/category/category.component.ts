import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { Observable } from 'rxjs';
import { Category } from '../../models/Category';
import { selectLoadingCategories } from '../../store/selectors/settings.selector';
import { selectCategories } from '../../store/selectors/settings.selector';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup
  categories$: Observable<Category[]>;
  loadingCategories$: Observable<boolean>;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      area: ['',  { validators: [ Validators.required ] }],
      name: ['',  { validators: [ Validators.required ] }],     
      categories: this.fb.array([]) 
    })

    this.categories$ = this.store.pipe(select(selectCategories));
    this.loadingCategories$ = this.store.pipe(select(selectLoadingCategories));
  }

  ngOnInit() {
  }

}