import type { QuizHistory, QuizType } from 'types';
import { ADDHISTORY, ADDQUIZ, DELETEQUIZ, SETSPLASH } from './types';

type RootType = {
  quizzes: QuizType[];
  history: QuizHistory[];
  showedSplash: boolean;
};

export const initialState: RootType = {
  quizzes: [],
  history: [],
  showedSplash: false,
};

const reducer = (state: RootType = initialState, action: { type: string; payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case ADDQUIZ:
      return {
        ...state,
        quizzes: [...state.quizzes, payload],
      };

    case DELETEQUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter(({ id }) => id !== payload),
      };

    case ADDHISTORY:
      return {
        ...state,
        history: [...state.history, payload],
      };

    case SETSPLASH:
      return {
        ...state,
        showedSplash: payload,
      };

    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;

export default reducer;
