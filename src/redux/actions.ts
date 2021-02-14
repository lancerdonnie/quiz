import type { QuizHistory, QuizType } from 'types';
import { ADDQUIZ, DELETEQUIZ, ADDHISTORY, SETSPLASH } from './types';

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

export const AddHistory = (data: Omit<QuizHistory, 'time'>) => {
  return {
    type: ADDHISTORY,
    payload: { ...data, time: new Date() },
  };
};

export const SetSplash = (data: boolean) => {
  return {
    type: SETSPLASH,
    payload: { data },
  };
};
