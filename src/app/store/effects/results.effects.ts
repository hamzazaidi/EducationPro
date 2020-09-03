import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap, concatMap, withLatestFrom, tap, filter } from 'rxjs/operators';
import { RouterActions, QuizActions, ResultsActions } from '../actions';
import * as routerSelectors from '../selectors/router.selector';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { Area } from '../../models/ConfigState';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { ResultsService } from '../../services/results.service';
import { DisplayQuestions } from '../../models/Question';
import { selectResponses, selectForm } from '../selectors/quiz.selector';
import { User } from '../../models/User';
import { selectUser } from '../selectors/config.selector';
import { Result } from '../../models/Result';
import * as firebase from 'firebase';

@Injectable()
export class ResultsEffects {
  responses$: Observable<DisplayQuestions[]>;
  user$: Observable<User>;
  form$: Observable<{ category: string; subCategory: string; }>;
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private resultSvc: ResultsService
  ) {
    this.user$ = this.store.pipe(select(selectUser));
    this.form$ = this.store.pipe(select(selectForm));
    this.responses$ = this.store.pipe(select(selectResponses));
  }

   loadResults$ = createEffect(() => this.actions$.pipe(
      ofType(ResultsActions.LoadResults),
      concatMap((actions) => of(actions).pipe(withLatestFrom(this.user$))),
      switchMap(([, user]) => {
        return this.resultSvc.getResults(user.uid).pipe(
          map(categories => ResultsActions.LoadResultsSuccess({ payload: categories }))
        );
      }),
      catchError(() => of(ResultsActions.LoadResultsFailure()))
  ));

  saveResult$ = createEffect(() => this.actions$.pipe(
      ofType(QuizActions.SaveResults),
      concatMap((actions) => of(actions).pipe(withLatestFrom(this.user$, this.form$, this.responses$))),
      switchMap(([, user, form, responses]) => {
         const { serverTimestamp } = firebase.firestore.FieldValue;

         const result: Result = {
          uid: user.uid,
          displayName: user.displayName,
          form,
          responses,
          createdAt: serverTimestamp()

        };
         return of(this.resultSvc.addResult(result)).pipe(
          switchMap(() => [ QuizActions.SaveResultsSuccess(), RouterActions.Go({ payload: { path: ['/results'] } }) ])
        );
      }),
      catchError(() => of(QuizActions.SaveResultsFailure()))
  ));

}
