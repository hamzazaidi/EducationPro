import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { CategoryService } from '../../services/category.service';
import { Area } from '../../models/ConfigState';
import { Observable } from 'rxjs';
import { Category } from '../../models/Category';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  private categoryCollection: Category[] = [];
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;
  quizForm: FormGroup;
  constructor(private categorySvc: CategoryService, private quizSvc: QuizService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['',  { validators: [ Validators.required ] }],
      categories: this.fb.array([])
    })

    this.subCategoryForm = this.fb.group({
      name: ['',  { validators: [ Validators.required ] }],
      category: ['',  { validators: [ Validators.required ] }],
      resource: this.fb.group({
        type: ['',  { validators: [ Validators.required ] }],
        url: ['',  { validators: [ Validators.required ] }],
        description: ['',  { validators: [ Validators.required ] }]
      }),
      subCategories: this.fb.array([])
    })

    this.quizForm = this.fb.group({
      question: ['',  { validators: [ Validators.required ] }],
      answers: this.fb.array([
        this.fb.group({
          value:['',  { validators: [ Validators.required ] }]
        }),
        this.fb.group({
          value:['',  { validators: [ Validators.required ] }]
        }),
        this.fb.group({
          value:['',  { validators: [ Validators.required ] }]
        }),
        this.fb.group({
          value:['',  { validators: [ Validators.required ] }]
        })
      ]),
      category: ['',  { validators: [ Validators.required ] }],
      correct: ['',  { validators: [ Validators.required ] }],
      questions: this.fb.array([])
    })
    console.log('quizForm ==>', this.quizForm)
  }

  ngOnInit() {
    this.categorySvc.getCategories({ cache: false }).subscribe(data => {
      this.categoryCollection = data;
      this.categories.clear()
      this.categoryList.forEach(c => {
        const { area, key, value, parent } = c
        this.categories.push(this.fb.group({ area, key, value, parent }))
      })      

      this.subCategories.clear();
      this.subCategoryList.forEach(c => {
        console.log('c ==>', c)
        const { key, value, parent, resource } = c
        this.subCategories.push(this.fb.group({
            key, value, parent,
            resource: this.fb.group({
              ...resource
            })
        }))
        console.log('this.subCategories ==>', this.subCategories)
      })      
    })    
    
    this.quizForm.get('category').valueChanges.subscribe(value => {
      this.quizSvc.getQuestions(value).subscribe(data => {
        this.questions.clear();
        data.forEach(q => {
          const { key, category, question, answers } = q
          this.questions.push(this.fb.group({
              key,
              category,
              question,
              answers: this.fb.array(answers.map(a => this.fb.group({ value: a.value }))),
              correct: this.fb.control(answers.findIndex(a => a.isCorrect))
            }));
        })

        console.log('This is quiz form after populated', this.quizForm)
      });
    })
  }

  onSubmit() {
    const { name } = this.categoryForm.getRawValue();
    this.categoryForm.get('name').reset();
    this.categoryForm.markAsPristine();    
    this.categorySvc.addCategory({
      value: name,
      parent: '-1',
      area: Area.GeneralKnowledge
    })
  }

  onSubCategorySubmit() {
    const { name, category, resource } = this.subCategoryForm.getRawValue();
    this.subCategoryForm.get('name').reset();
    this.subCategoryForm.get('category').reset();
    this.subCategoryForm.get('resource').reset();
    this.subCategoryForm.markAsPristine();    
    this.categorySvc.addCategory({
      value: name,
      parent: category,
      resource
    })
  }

  onQuizSubmit() {
    const form = this.quizForm.getRawValue();
    this.quizForm.get('question').reset();
    this.quizForm.get('answers').reset();
    this.quizForm.get('correct').reset();
    this.quizSvc.addQuestion(form);
  }

  onDelete(key) {    
    console.log('Key ==>', key)
    this.categorySvc.deleteCategory(key)
  }

  onUpdate(category) {    
    console.log('Key ==>', category)
    this.categorySvc.updateCategory(category)
  }

  onQuestionDelete(key) {    
    console.log('Key ==>', key)
    this.quizSvc.deleteQuestion(key)
  }

  onQuestionUpdate(question) {    
    console.log('Key ==>', question)
    this.quizSvc.updateQuestion(question)
  }

  
  get categoryList() {
    return this.categoryCollection.filter(c => c.parent === '-1')
  }

  get subCategoryList() {
    return this.categoryCollection.filter(c => c.parent !== '-1')
  }
 
  get categories() : FormArray {
    return this.categoryForm.get("categories") as FormArray;
  }

  get subCategories() : FormArray {
    return this.subCategoryForm.get("subCategories") as FormArray;
  }

  get questions() : FormArray {
    return this.quizForm.get("questions") as FormArray;
  }

  get answers(): FormArray {
    return this.quizForm.get('answers') as FormArray;
  }


}