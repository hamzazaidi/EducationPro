import { createReducer, on } from "@ngrx/store";
import { QuizState, QuizStatus } from "../../models/QuizState";
import { Question, DisplayQuestions } from "../../models/Question";
import { QuizActions, CategoryActions, QuestionActions } from "../actions";



export const initialState: QuizState = {
  showResource: true,
  categories: {
    isLoading: false,
    items: []
  },
  revealingAnswer: false,
  questionOnScreen: {
    key: '',
    question: '',
    answers: []
  },
  quizStore: {
    isLoading: false,
    items: []
  },
  form: {
    category: '',
    subCategory: ''
  },
  status: QuizStatus.NotStarted,
  responses: [],
  savingResult: false
};

export const reducer = createReducer(
  initialState,
  on(CategoryActions.LoadCategories, (state: QuizState): QuizState => {
    return {
      ...state,
      categories: {
        ...state.categories,
        isLoading: true
      }
   }
  }),
  on(CategoryActions.LoadCategoriesSuccess, (state: QuizState, { payload }): QuizState => {
    return {
      ...state,
      categories: {
        items: [ ...payload ],
        isLoading: false
      }
   }
  }),
  on(CategoryActions.LoadCategoriesFailure, (state: QuizState): QuizState => {
    return {
      ...state,
      categories: {
        items: [],
        isLoading: false
      }
   }
  }),
   on(QuestionActions.LoadQuestions, (state: QuizState): QuizState => {
    return {
      ...state,
      quizStore: {
        ...state.quizStore,
        isLoading: true
      }
   }
  }),
  on(QuestionActions.LoadQuestionsSuccess, (state: QuizState, { payload }): QuizState => {
    return {
      ...state,
      quizStore: {
        items: [ ...payload ],
        isLoading: false
      }
   }
  }),
  on(QuestionActions.LoadQuestionsFailure, (state: QuizState): QuizState => {
    return {
      ...state,
      quizStore: {
        items: [],
        isLoading: false
      }
   }
  }),
  on(QuizActions.ResetQuizInStore, (state: QuizState): QuizState => {
    return {
      ...state,
      questionOnScreen: { ...initialState.questionOnScreen },
      quizStore: {
        isLoading: false,
        items: []
      }
   }
  }),
  on(QuizActions.UpdateForm, (state: QuizState, { payload }): QuizState => {
    console.log('Update Home Form ==>', payload)
    return {
      ...state,
      form: { ...payload }
   }
  }),
  on(QuizActions.ResetQuiz, (state: QuizState): QuizState => {
    console.log('Reseting QUiz')
    return {
      ...initialState
   }
  }),
   on(QuizActions.RetryQuiz, (state: QuizState): QuizState => {
    console.log('Retrying', state)
    const form = { ...state.form }
    console.log('new State ==>', {
      ...initialState,
      form
    })
    return {
      ...initialState,
      form
   }
  }),
  on(QuizActions.ToggleResource, (state: QuizState): QuizState => {
    return {
      ...state,
      showResource: !state.showResource
    }
  }),
  on(QuizActions.ToggleRevealAnswer, (state: QuizState): QuizState => {    
    const question: Question = state.quizStore.items.find(q => q.key === state.questionOnScreen.key)
    const validAnswer = question.answers.find(a => a.isCorrect);
    return {
      ...state,
      questionOnScreen: {
        ...state.questionOnScreen,
        answers: state.questionOnScreen.answers.map(a => ({ ...a, isCorrect: a.key === validAnswer.key }))
      },
      revealingAnswer: !state.revealingAnswer
    }
  }),
  on(QuizActions.SelectAnswer, (state: QuizState, { payload }): QuizState => {
      console.log('SelectAnswer ==>', payload);      
      return {
        ...state,
        questionOnScreen: {
          ...state.questionOnScreen,
          answers: state.questionOnScreen.answers.map((a, i) => ({ ...a, selected: a.key === payload.key }))
        }
      }
  }),
  on(QuizActions.SetQuestionOnScreen, (state: QuizState): QuizState => {
    console.log('Set Question on Screen')
    let responses = [ ...state.responses ]
    let status = state.status;
    let q: Question;
    let questionOnScreen: DisplayQuestions;
    if(!state.questionOnScreen.key) {      
        q = state.quizStore.items[0]        
    } else {
      responses = [ ...state.responses, state.questionOnScreen ]
      const index = state.quizStore.items.findIndex(item => item.key === state.questionOnScreen.key)
      q = state.quizStore.items[index + 1];
    }

    if(responses.length === state.quizStore.items.length) {
      questionOnScreen = { ...initialState.questionOnScreen };
      status = QuizStatus.Finished;
    } else {
      status = QuizStatus.InProgress;
      questionOnScreen = {
        key: q.key,
        question: q.question,
        answers: q.answers.map(a => ({ ...a, selected: false, isCorrect: false }))
      }
    }
    return {
      ...state,
      status,
      responses,
      questionOnScreen
    }
  }),
  on(QuizActions.SaveResults, (state: QuizState): QuizState => {
    return {
      ...state,
      savingResult: true
    }
  }),
  on(QuizActions.SaveResultsSuccess, (state: QuizState): QuizState => {
    return {
      ...state,
      savingResult: false
    }
  }),
  on(QuizActions.SaveResultsFailure, (state: QuizState): QuizState => {
    return {
      ...state,
      savingResult: false
    }
  })
);
