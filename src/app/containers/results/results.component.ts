import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../models/AppState';
import { Observable, of } from 'rxjs';
import { selectScore, selectPhrase, selectColor, selectHasResponses } from '../../store/selectors/quiz.selector';
import { selectUser } from '../../store/selectors/config.selector';
import { QuizActions, RouterActions, ResultsActions, CategoryActions   } from '../../store/actions';
import { selectResultIsLoading, selectResults } from '../../store/selectors/results.selector';
import { Result } from '../../models/Result';
import { Answer, DisplayQuestions } from '../../models/Question';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {  
  score$: Observable<string>;  
  phrase$: Observable<string>;
  color$: Observable<string>;  
  resultsIsLoading$: Observable<boolean>;
  hasResponses$: Observable<boolean>;
  results$: Observable<{ quiz: string; score: string; date: string; responses: DisplayQuestions[] }[]>;
  constructor(private store: Store<AppState>) {    
    this.score$ = this.store.pipe(select(selectScore))
    this.phrase$ = this.store.pipe(select(selectPhrase));
    this.color$ = this.store.pipe(select(selectColor));
    this.resultsIsLoading$ = this.store.pipe(select(selectResultIsLoading))
    this.results$ = this.store.pipe(select(selectResults))
    this.hasResponses$ = this.store.pipe(select(selectHasResponses))
    this.results$.subscribe(console.log)

  }

  ngOnInit() {
    this.store.dispatch(CategoryActions.LoadCategories());
    this.store.dispatch(ResultsActions.LoadResults());    
  }

  onRetry() {
    console.log('I am Retry Button event')
    this.store.dispatch(QuizActions.RetryQuiz());
    this.store.dispatch(RouterActions.Go({ payload: { path: ['/quiz'] } }))
  }

  onNewQuiz() {
    console.log('I am new quiz button event')
    this.store.dispatch(QuizActions.ResetQuiz());
    this.store.dispatch(RouterActions.Go({ payload: { path: ['/quiz'] } }))
  }

}