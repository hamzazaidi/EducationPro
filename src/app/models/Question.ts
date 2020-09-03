import { Category } from "./Category"

export interface Question {
  key: string;
  question: string,
  answers: Answer[],  
  category: Category
}



export interface Answer {
  key: string;
  value: string;
  selected: boolean;
  isCorrect: boolean;
}


export interface DisplayQuestions {
    key: string;
    question: string;
    answers: Answer[]
}