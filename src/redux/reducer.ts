import type { QuizType } from 'types';
import { ADDQUIZ } from './types';

type RootType = {
  quizzes: QuizType[];
};

export const initialState: RootType = {
  quizzes: [
    {
      id: '6cHwzAhBqbMcD-ChWwAeY',
      name: 'First Quiz',
      quiz: [
        {
          id: 'jdwdnd',
          name: 'Are you born again?',
          options: [
            {
              value: 'Yes',
              answer: true,
            },
            {
              value: 'No',
              answer: false,
            },
          ],
        },
        {
          id: 'jdwdddnd',
          name: 'Are you a christian',
          options: [
            {
              value: 'Yes',
              answer: false,
            },
            {
              value: 'No',
              answer: true,
            },
          ],
        },
      ],
    },
  ],
};

const reducer = (state: RootType = initialState, action: { type: string; payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case ADDQUIZ:
      return {
        ...state,
        quizzes: payload,
      };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;

export default reducer;
