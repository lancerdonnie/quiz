import type { QuizType } from 'types';
import { ADDQUIZ } from './types';

export const AddQuiz = (quiz: QuizType) => {
  return {
    type: ADDQUIZ,
    payload: quiz,
  };
};
