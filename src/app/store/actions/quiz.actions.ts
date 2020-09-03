import { createAction, props } from '@ngrx/store';
import { Answer } from '../../models/Question';
import { Category } from '../../models/Category';



export enum QuizActionTypes {
  UpdateForm = '[Screen Form] Update form',
  SetQuestion = '[Quiz Question] Set question on screen',
  SelectAnswer = '[SelectAnswer] Select Answer',
  ToggleRevealAnswer = '[Toggle Reveal Answer] toggle the reveal answer flag',
  ResetQuiz = '[Reset Quiz] Reset Quiz on the screen',
  RetryQuiz = '[Reset Quiz] Retry Quiz on the screen',
  SetQuizInStore = '[Set Quiz] Set quiz in the store based on sub Category Id',
  ResetQuizInStore = '[Reset Quiz] Reset quiz in the store based on Category Id',
  ToggleResource = '[Show/ Hide] Resource Section',
  SaveResults = '[Results] Save Results',
  SaveResultsSuccess = '[Results] Save Results Success',
  SaveResultsFailure = '[Results] Save Results Failure',
}

export const UpdateForm = createAction(QuizActionTypes.UpdateForm, props<{ payload: { category: string, subCategory: string } }>());
export const SetQuizInStore = createAction(QuizActionTypes.SetQuizInStore);
export const ResetQuizInStore = createAction(QuizActionTypes.ResetQuizInStore);
export const SetQuestionOnScreen = createAction(QuizActionTypes.SetQuestion);
export const SelectAnswer = createAction(QuizActionTypes.SelectAnswer, props<{ payload: Answer }>());
export const ResetQuiz = createAction(QuizActionTypes.ResetQuiz);
export const RetryQuiz = createAction(QuizActionTypes.RetryQuiz);
export const ToggleRevealAnswer = createAction(QuizActionTypes.ToggleRevealAnswer);
export const ToggleResource = createAction(QuizActionTypes.ToggleResource);

export const SaveResults = createAction(QuizActionTypes.SaveResults);
export const SaveResultsSuccess = createAction(QuizActionTypes.SaveResultsSuccess);
export const SaveResultsFailure = createAction(QuizActionTypes.SaveResultsFailure);
