import { createAction, props } from "@ngrx/store";
import { Question } from "../../models/Question";


export enum QuestionActionTypes {
  LoadQuestions = '[Questions] Load Questions',
  LoadQuestionsSuccess = '[Questions] Load Questions Success',
  LoadQuestionsFailure = '[Questions] Load Questions Failure',
}

export const LoadQuestions = createAction(QuestionActionTypes.LoadQuestions, props<{ payload: string }>())
export const LoadQuestionsSuccess = createAction(QuestionActionTypes.LoadQuestionsSuccess, props<{ payload: Question[] }>())
export const LoadQuestionsFailure = createAction(QuestionActionTypes.LoadQuestionsFailure)