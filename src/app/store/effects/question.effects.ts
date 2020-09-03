import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, concatMap, withLatestFrom, tap, filter } from 'rxjs/operators';
import { QuestionActions, QuizActions } from '../actions';
import * as routerSelectors from '../selectors/router.selector'
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { Area } from '../../models/ConfigState';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { QuizService } from '../../services/quiz.service';

@Injectable()
export class Questionffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private quizSvc: QuizService
  ) {}

  
  loadQuestions$ = createEffect(() => this.actions$.pipe(    
      ofType(QuestionActions.LoadQuestions),      
      switchMap((actions) => {
        const { payload } = actions;
        return this.quizSvc.getQuestions(payload).pipe(
          switchMap(questions => [QuestionActions.LoadQuestionsSuccess({ payload: questions }), QuizActions.SetQuestionOnScreen()])
        )
      }),
      catchError(() => of(QuestionActions.LoadQuestionsFailure()))
  ));  
}