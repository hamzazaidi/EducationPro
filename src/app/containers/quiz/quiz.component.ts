import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { Observable, of } from 'rxjs';
import { selectUser } from '../../store/selectors/config.selector';
import { ResourceType } from '../../models/KeyValuePair';
import { Category } from '../../models/Category';
import {
  selectCategoriesByParent,
  selectQuestion,
  selectAnswerIsSelected,
  selectRevealAnswer,
  selectQuizStatus,
  selectForm,
  selectLoadingCategories,
  selectResourceByCategoryId,
  selectShowResource,
  selectLoadingQuestions,
selectIsSavingResult
} from '../../store/selectors/quiz.selector';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { Question, Answer } from '../../models/Question';
import { QuizActions, RouterActions, CategoryActions, QuestionActions, ResultsActions } from '../../store/actions';
import { QuizStatus } from '../../models/QuizState';
const WAITTIME = 2000;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  form: FormGroup;
  categories$: Observable<Category[]>;
  loadingCategories$: Observable<boolean>;
  loadingQuestions$: Observable<boolean>;
  subCategories$: Observable<Category[]>;
  question$: Observable<{ question: string; answers: Answer[] }>;
  answerIsSelected$: Observable<boolean>;
  revealAnswer$: Observable<boolean>;
  form$: Observable<{ category: string; subCategory: string }>;
  quizStatus$: Observable<QuizStatus>;
  resource$: Observable<{ type: ResourceType; url: string, description: string }>;
  showResource$: Observable<boolean>;
  savingResult$: Observable<boolean>;
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.form = this.fb.group({
      category: '',
      subCategory: ''
    });
    this.categories$ = this.store.pipe(
      select(selectCategoriesByParent, { parent: '-1' })
    );
    this.loadingCategories$ = this.store.pipe(select(selectLoadingCategories));
    this.question$ = this.store.pipe(select(selectQuestion));
    this.answerIsSelected$ = this.store.pipe(select(selectAnswerIsSelected));
    this.revealAnswer$ = this.store.pipe(select(selectRevealAnswer));
    this.quizStatus$ = this.store.pipe(select(selectQuizStatus));
    this.form$ = this.store.pipe(select(selectForm));
    this.showResource$ = this.store.pipe(select(selectShowResource));
    this.loadingQuestions$ = this.store.pipe(select(selectLoadingQuestions));
    this.savingResult$ = this.store.pipe(select(selectIsSavingResult));
  }

  ngOnInit() {
    this.store.dispatch(CategoryActions.LoadCategories());
    this.form$.pipe(take(1)).subscribe(({ category, subCategory }) => {
      if (category && subCategory) {
        this.form.patchValue({ category, subCategory });
        this.subCategories$ = this.store.pipe(
          select(selectCategoriesByParent, { parent: category })
        );
        this.resource$ = this.store.pipe(
          select(selectResourceByCategoryId, { key: subCategory })
        );
        this.store.dispatch(QuestionActions.LoadQuestions({ payload: subCategory }));
      }
    });

    this.form.get('category').valueChanges.subscribe(value => {
      this.subCategories$ = this.store.pipe(
        select(selectCategoriesByParent, { parent: value })
      );
      this.store.dispatch(QuizActions.ResetQuizInStore());
    });

    this.form.get('subCategory').valueChanges.subscribe(value => {
      const { category, subCategory } = this.form.getRawValue();
      this.resource$ = this.store.pipe(
        select(selectResourceByCategoryId, { key: subCategory })
      );
      this.store.dispatch(
        QuizActions.UpdateForm({ payload: { category, subCategory } })
      );
      this.store.dispatch(QuestionActions.LoadQuestions({ payload: subCategory }));
    });

    this.quizStatus$.subscribe(status => {
      if (status === QuizStatus.Finished) {
        this.store.dispatch(QuizActions.SaveResults());
      }
    });
  }

  selectAnswer(answer) {
    this.store.dispatch(QuizActions.SelectAnswer({ payload: answer }));
  }

  onNext() {
    this.store.dispatch(QuizActions.ToggleRevealAnswer());
    setTimeout(() => {
      this.store.dispatch(QuizActions.ToggleRevealAnswer());
      this.store.dispatch(QuizActions.SetQuestionOnScreen());
    }, WAITTIME);
  }

  hideResource() {
    this.store.dispatch(QuizActions.ToggleResource());
  }
}
