import { KeyValuePair } from "./KeyValuePair";
import { Question, Answer, DisplayQuestions } from "./Question";
import { Category } from "./Category"

export enum QuizStatus {
  NotStarted = 1,
  InProgress = 2,
  Finished = 3
}

export interface QuizState {
  categories: { isLoading: boolean; items: Category[] };
  revealingAnswer: boolean;
  showResource: boolean;
  questionOnScreen: DisplayQuestions;
  quizStore: {
    isLoading: boolean;
    items: Question[];
  };
  form: {
    category: string;
    subCategory: string;
  },
  status: QuizStatus,
  responses: DisplayQuestions[],
  savingResult: boolean;
}