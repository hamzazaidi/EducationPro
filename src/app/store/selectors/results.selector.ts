import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ResultState } from "../../models/ResultState";
import { Category } from "../../models/Category";
import { selectCategories, numOfCorrectAnswers, totalResponses } from "./quiz.selector";
import * as firebase from 'firebase';

const getResultState = createFeatureSelector<ResultState>("results");

export const selectResultIsLoading = createSelector(
  getResultState,
  (state: ResultState) => state.resultsHistory.isLoading
);

export const selectResults = createSelector(
  getResultState,
  selectCategories,
  (state: ResultState, categories: Category[]) => {
    return state.resultsHistory.results.map(r => {      
      const { Timestamp } = firebase.firestore;
      let seconds, nanoseconds, date;
      if(r.createdAt) {
        seconds = r.createdAt.seconds;
        nanoseconds = r.createdAt.nanoseconds;
        date = new Timestamp(seconds, nanoseconds).toDate();
      } else {
        date = new Date();
      }
      const category = categories.length ? categories.find(c => c.key === r.form.category).value : '';
      const subCategory = categories.length ? categories.find(c => c.key === r.form.subCategory).value: '';
      const num = numOfCorrectAnswers(r);
      const total = totalResponses(r);  
      
      return {
        quiz: `${category} - ${subCategory}`,
        score: `${num}/${total}`,
        date: date,
        responses: r.responses
      };
    }).sort((a, b) => b.date - a.date);
  }
);
