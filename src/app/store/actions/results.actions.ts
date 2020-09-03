import { createAction, props } from "@ngrx/store";
import { DisplayQuestions } from "../../models/Question";
import { Result } from "../../models/Result";


export enum ResultsActionTypes {
  LoadResults = '[Results] Load Results',
  LoadResultsSuccess = '[Results] Load Results Success',
  LoadResultsFailure = '[Results] Load Results Failure'
}

export const LoadResults = createAction(ResultsActionTypes.LoadResults)
export const LoadResultsSuccess = createAction(ResultsActionTypes.LoadResultsSuccess, props<{ payload: Result[] }>());
export const LoadResultsFailure = createAction(ResultsActionTypes.LoadResultsFailure)
