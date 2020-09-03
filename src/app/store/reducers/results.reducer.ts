import { ResultState } from "../../models/ResultState";
import { createReducer, on } from '@ngrx/store'
import { ResultsActions } from "../actions";

export const initialState: ResultState = {
  resultsHistory: {
    isLoading: false,
    results: []
  }
}


export const reducer = createReducer(
  initialState,
   on(ResultsActions.LoadResults, (state: ResultState): ResultState => {
    return {
      ...state,
      resultsHistory: {
        ...state.resultsHistory,
        isLoading: true
      }
    }
  }),
  on(ResultsActions.LoadResultsSuccess, (state: ResultState, { payload }): ResultState => {
    return {
      ...state,
      resultsHistory: {
        results: [ ...payload ],
        isLoading: false
      }
    }
  }),
  on(ResultsActions.LoadResultsFailure, (state: ResultState): ResultState => {
    return {
      ...state,
      resultsHistory: {
        results: [],
        isLoading: false
      }
    }
  })
)


