import Button from 'components/Button';
import React from 'react';
import { QuizType } from 'types';

type Props = {
  state: QuizType;
  setState: React.Dispatch<React.SetStateAction<QuizType>>;
};

const QuestionsView = ({ state, setState }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="text-lg font-bold">{state.name}</div>
      <div className="w-full p-2">
        {state.quiz.map((e, i) => {
          return (
            <div key={e.name} className="mb-4">
              <div>
                {i + 1}. {e.name}
              </div>
              <div className="ml-1">
                {e.options.map((f) => {
                  return (
                    <div className="ml-4" key={f.value}>
                      <span className="mr-2 h-2 w-2 bg-black inline-block rounded-full"></span>
                      <span className={`${f.answer && 'text-green-400'}`}>{f.value}</span>
                    </div>
                  );
                })}
              </div>
              <Button
                className="mt-2 ml-4"
                icon="trash"
                onClick={() => {
                  setState((st) => ({ ...st, quiz: st.quiz.filter((g) => g.name !== e.name) }));
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionsView;
