import { QuizState } from './QuizState'
import { ConfigState } from './ConfigState';
import { ResultState } from './ResultState';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  config: ConfigState,
  router: fromRouter.RouterReducerState<any>;  
  quiz: QuizState,
  results: ResultState
}