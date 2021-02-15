import Button from 'components/Button/Button';
import React from 'react';
import { QuizType } from 'types';

type Props = {
  state: QuizType;
  setState: React.Dispatch<React.SetStateAction<QuizType>>;
};

const QuestionsView = ({ state, setState }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center break-words sm:mt-6">
      <div className="text-lg pl-6">{state.name}</div>
      <div className="w-full p-2 ml-8">
        {state.quiz.map((e, i) => {
          return (
            <div key={e.id} className="mb-4 flex">
              <div className="-ml-4">{i + 1}. </div>
              <div className="ml-2">
                <span>{e.question}</span>
                <div className="">
                  {e.options.map((f) => {
                    return (
                      <div className="" key={f.value}>
                        <span className="mr-2 h-2 w-2 bg-gray-600 inline-block rounded-full"></span>
                        <span className={`${f.answer && 'text-green-400'}`}>{f.value}</span>
                      </div>
                    );
                  })}
                </div>
                <Button
                  className="mt-2"
                  icon="trash"
                  onClick={() => {
                    setState((st) => ({ ...st, quiz: st.quiz.filter((g) => g.id !== e.id) }));
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionsView;
