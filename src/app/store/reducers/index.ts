import { InjectionToken } from "@angular/core";
import { ActionReducerMap, Action } from "@ngrx/store";
import { routerReducer } from '@ngrx/router-store';
import { AppState } from "../../models/AppState";
import * as fromQuizReducer from './quiz.reducer'
import * as fromConfigReducer from './config.reducer'
import * as fromResultsReducer from './results.reducer'

export const ROOT_REDUCER = new InjectionToken<ActionReducerMap<AppState, Action>>(
  'Root Reducer token', {
    factory: () => ({
      config: fromConfigReducer.reducer,
      router: routerReducer,      
      quiz: fromQuizReducer.reducer,
      results: fromResultsReducer.reducer
    })
  })