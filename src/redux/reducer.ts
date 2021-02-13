import type { QuizType } from 'types';
import { ADDQUIZ, DELETEQUIZ } from './types';

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
        {
          id: 'jdwdiudnd',
          name: 'Who is the president',
          options: [
            {
              value: 'Olusegun Obasanjo',
              answer: false,
            },
            {
              value: 'Muhammadu Buhari',
              answer: true,
            },
            {
              value: 'Aisha Buhari',
              answer: false,
            },
            {
              value: 'Atiku',
              answer: false,
            },
          ],
        },
      ],
    },
    {
      id: 'MC63y2fEeAekSuYNMxrPz',
      name: 'fwf',
      quiz: [
        {
          id: 'eo1mqURHaUMSbryYQXY9l',
          name: 'wff',
          options: [
            {
              value: 'Are you okay',
              answer: false,
            },
            {
              value: 'wdd',
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
        quizzes: [...state.quizzes, payload],
      };
    case DELETEQUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;

export default reducer;
