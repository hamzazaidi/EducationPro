import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuizState } from "../../models/QuizState";
import { selectArea } from "./config.selector";

export const numOfCorrectAnswers = (state) => {
  return state.responses.reduce((acc, curr) => {
    const isCorrect = curr.answers.find(a => a.selected && a.isCorrect);
    if(isCorrect) { acc = acc+1;  }
    return acc;
  }, 0)
}

export const totalResponses = (state) => state.responses.length;

const getQuizState = createFeatureSelector<QuizState>('quiz')

export const selectLoadingCategories = createSelector(getQuizState, (state: QuizState) => state.categories.isLoading)

export const selectCategories = createSelector(getQuizState, (state: QuizState) => state.categories.items)

export const selectCategoriesByParent = createSelector(
  selectCategories,
  selectArea,
  (categories, area, props) => {
    return categories.filter(category => {
      let isMatch = true;
      if (category.area) {
        isMatch = category.area === area;
      }
      return isMatch && category.parent === props.parent
    });
  }
)

export const selectLoadingQuestions = createSelector(getQuizState, (state: QuizState) => state.quizStore.isLoading)

export const selectQuestion = createSelector(getQuizState, (state) => {
  if(!state.questionOnScreen.key) { return null; }
  return state.questionOnScreen;
})

export const selectAnswerIsSelected = createSelector(getQuizState, (state) => {  
  return state.questionOnScreen.answers.some(a => a.selected);
})

export const selectRevealAnswer = createSelector(getQuizState, (state) => {
  return state.revealingAnswer;
})

export const selectQuizStatus = createSelector(getQuizState, (state) => {
  return state.status;
})

export const selectHasResponses = createSelector(getQuizState, (state) => {  
  return state.responses.length > 0;
})

export const selectScore = createSelector(getQuizState, (state) => {
  const num = numOfCorrectAnswers(state);
  const total = totalResponses(state);
  return `${num}/${total}`;
})

export const selectPhrase = createSelector(getQuizState, (state) => {
  const num = numOfCorrectAnswers(state);
  const total = totalResponses(state);
  const percentage = (num/total)*100
  let phrase;
  if(percentage >= 80) {
    phrase = 'Excellent work'
  } else if(percentage > 50 && percentage <80) {
    phrase = 'Nice work'
  } else {
    phrase = 'Good luck next time'
  }
  return phrase;
})


export const selectColor = createSelector(getQuizState, (state) => {
  const num = numOfCorrectAnswers(state);
  const total = totalResponses(state);
  const percentage = (num/total)*100
  let color;
  if(percentage >= 80) {
    color = '#59b559'
  } else if(percentage > 50 && percentage <80) {
    color = '#ffd600'
  } else {
    color = '#f56868'
  }
  return color;
})


export const selectForm = createSelector(getQuizState, (state) => {
  return state.form;
})

export const selectResourceByCategoryId = createSelector(selectCategories, (categories, props) => {
  const category = categories.find(c => c.key === props.key);
  if (!category) { return null; }
  const { resource } = category;
  return resource;
})

export const selectShowResource = createSelector(getQuizState, (state) => {  
  return state.showResource;
})


export const selectResponses = createSelector(getQuizState, (state) => {
  return state.responses;
})


export const selectIsSavingResult = createSelector(getQuizState, (state) => {
  return state.savingResult;
})

