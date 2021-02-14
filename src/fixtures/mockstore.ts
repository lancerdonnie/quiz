import { createStore } from 'redux';
import reducer from 'redux/reducer';

const initialState = {
  quizzes: [
    {
      id: '6cHwzAhBqbMcD-ChWwAeY',
      name: 'First Quiz',
      quiz: [
        {
          id: 'jdwdnd',
          question: 'Are you born again?',
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
          question: 'Are you a christian',
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
          question: 'Who is the president',
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
      name: 'my test',
      quiz: [
        {
          id: 'eo1mqURHaUMSbryYQXY9l',
          question: 'Which pets are the cutest',
          options: [
            {
              value: 'Dogs',
              answer: false,
            },
            {
              value: 'Cats',
              answer: true,
            },
          ],
        },
      ],
    },
  ],
  history: [
    { id: 'MC63y2fEeAekSuYNMxrPz', name: 'my test', total: 1, score: 0, time: '2021-02-14T19:12:08.902Z' },
  ],
  showSplash: false,
};

export const mockStore = createStore<any, any, any, any>(reducer, initialState);
