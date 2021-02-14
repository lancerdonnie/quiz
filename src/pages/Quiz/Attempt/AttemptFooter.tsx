import type { Answer, QuizQuestionType } from 'types';
import React from 'react';
import Toast from 'components/Toast';
import { useDispatch } from 'react-redux';
import { AddHistory } from 'redux/actions';

type Props = {
  answers: Answer[];
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setDir: React.Dispatch<React.SetStateAction<boolean>>;
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
  quiz: QuizQuestionType[];
  done: boolean;
  id: string;
  name: string;
};

const AttemptFooter = ({
  answers,
  count,
  setCount,
  quiz,
  setDir,
  setAnswers,
  done,
  setDone,
  id,
  name,
}: Props) => {
  const dispatch = useDispatch();

  const lastQuestion = count === quiz.length - 1;
  const division = answers.length / answers.filter((e) => e.value).length;

  return (
    <div className="fixed bottom-0.5 left-0.5 w-full p-2 z-10 flex justify-between items-end">
      <div>
        <span className="text-xs text-gray-500">{Math.floor(100 / division)}% completed</span>
        <div className="bg-gray-300 h-1 w-60">
          <div
            className="h-full bg-gray-700"
            style={{
              width: 240 / division,
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        <i
          className={`fa fa-chevron-up attempticon rounded-l border-r border-solid border-gray-400  ${
            count === 0 ? 'pointer-events-none opacity-50' : ''
          }`}
          onClick={() => {
            if (count === 0) {
              setCount(quiz.length - 1);
            } else {
              setCount(count - 1);
            }
            setDir(true);
          }}
        ></i>

        {lastQuestion && !done ? (
          <i
            className="fa fa-check attempticon rounded-r"
            onClick={() => {
              if (answers.some((ans) => !ans.value))
                return Toast({ msg: 'Please answer all questions', type: 'warning' });
              if (!window.confirm('Are you sure you want to submit?')) return;
              dispatch(
                AddHistory({
                  id,
                  name,
                  total: quiz.length,
                  score: answers.filter(({ value, answer }) => value === answer).length,
                })
              );
              setDone(true);
              setCount(count + 1);
              setDir(false);
            }}
          ></i>
        ) : (
          <i
            className={`fas fa-chevron-down attempticon rounded-r ${
              count === quiz.length ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() => {
              if (count === quiz.length) {
                setCount(0);
              } else {
                setCount(count + 1);
              }
              setDir(false);
            }}
          ></i>
        )}

        {done && (
          <i
            className="ml-2 sm:ml-0 fa fa-history attempticon rounded"
            onClick={() => {
              setAnswers(
                quiz.map((e) => ({
                  id: e.id,
                  value: '',
                  answer: e.options.find((op) => op.answer === true)?.value,
                }))
              );
              setCount(0);
              setDir(true);
              setDone(false);
            }}
          ></i>
        )}
      </div>
    </div>
  );
};

export default AttemptFooter;
