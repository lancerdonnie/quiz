import type { QuizType } from 'types';
import { ADDQUIZ, DELETEQUIZ } from './types';

export const AddQuiz = (quiz: QuizType) => {
  return {
    type: ADDQUIZ,
    payload: quiz,
  };
};
export const DeleteQuiz = (id: string) => {
  return {
    type: DELETEQUIZ,
    payload: id,
  };
};
