import React from 'react';
import { QuizQuestionType } from 'types';

type Props = {
  answers: { id: string; answer?: string; value: string }[];
  count: number;
  setCount: (e: any) => void;
  setDir: (e: any) => void;
  setAnswers: (e: any) => void;
  setDone: (e: any) => void;
  quiz: QuizQuestionType[];
  done: boolean;
};

const QuizFooter = ({ answers, count, setCount, quiz, setDir, setAnswers, done, setDone }: Props) => {
  const lastQuestion = count === quiz.length - 1;
  const finalPage = count === quiz.length;

  return (
    <div className="fixed bottom-0.5 left-0.5 w-full p-2 z-10 flex justify-between">
      <div>
        <span className="text-xs text-gray-500">
          {Math.floor(100 / (answers.length / answers.filter((e) => e.value).length))}% completed
        </span>
        <div className="bg-gray-300 h-1 w-60">
          <div
            className="h-full bg-gray-700"
            style={{
              width: 240 / (answers.length / answers.filter((e) => e.value).length),
            }}
          ></div>
        </div>
      </div>
      <div>
        <i
          className={`fa fa-chevron-up cursor-pointer text-blue-900 bg-blue-300 hover:bg-blue-200 transition duration-100 ease-out p-2 rounded-l border-r border-solid border-gray-400  ${
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
            className="fa fa-check cursor-pointer text-blue-900 bg-blue-300 hover:bg-blue-200 transition duration-100 ease-out p-2 rounded-r"
            onClick={() => {
              if (answers.some((ans) => !ans.value)) return; //toast no answer on one
              if (!window.confirm('Are you sure you want to submit?')) return;
              setDone(true);
              setCount(count + 1);
              setDir(false);
            }}
          ></i>
        ) : (
          <i
            className={`fas fa-chevron-down cursor-pointer text-blue-900 bg-blue-300 hover:bg-blue-200 transition duration-100 ease-out p-2 rounded-r ${
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
            className="ml-2 cursor-pointer fa fa-history text-blue-900 bg-blue-300 hover:bg-blue-200 transition duration-100 ease-out p-2 rounded"
            onClick={() => {
              setAnswers(quiz.map((e) => ({ id: e.id, value: '', answer: e.options.find((op) => op.answer === true)?.value })));
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

export default QuizFooter;
