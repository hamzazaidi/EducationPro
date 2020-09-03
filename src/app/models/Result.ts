import { DisplayQuestions } from "./Question";

export interface Result {
  uid: string;
  displayName: string;
  form: {
    category: string;
    subCategory: string;
  },
  responses: DisplayQuestions[],
  createdAt: any;
}