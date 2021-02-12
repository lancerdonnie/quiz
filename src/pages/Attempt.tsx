import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from 'redux/reducer';
import { OptionType, QuizType } from 'types';

const Attempt = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const quiz: QuizType = useSelector(({ quizzes }: RootState) => quizzes.find((e: QuizType) => e.id === id));
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<{ id: string; answer?: string; value: string }[]>(() => {
    if (!quiz) return [];
    return quiz.quiz.map((e) => ({ id: e.id, value: '', answer: e.options.find((op) => op.answer === true)?.value }));
  });

  if (!quiz) history.push('/');

  return (
    <div>
      <div>{quiz.name}</div>
      <div>
        {quiz.quiz.map((q) => {
          return (
            <div key={q.id}>
              <div>{q.name}</div>
              <div>
                {q.options.map((o) => {
                  return (
                    <Option
                      disabled={done}
                      checked={answers.find((ans) => ans.id === q.id)?.value === o.value ? true : false}
                      key={o.value}
                      data={o}
                      name={q.id}
                      onChange={() => {
                        const copy = [...answers];
                        copy.forEach((a) => {
                          if (a.id === q.id) {
                            a.value = o.value;
                          }
                        });
                        setAnswers(copy);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {done ? (
        <div></div>
      ) : (
        <button
          onClick={() => {
            if (answers.some((ans) => !ans.value)) return; //toast no answer on one
            setDone(true);
          }}
        >
          Submit
        </button>
      )}
      {done && (
        <div>
          scored {answers.filter((ans) => ans.answer === ans.value).length} out of {answers.length}
        </div>
      )}
      <div>
        <button
          onClick={() => {
            setAnswers(
              quiz.quiz.map((e) => ({ id: e.id, value: '', answer: e.options.find((op) => op.answer === true)?.value }))
            );
            setDone(false);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

const Option = ({
  data,
  ...props
}: {
  data: OptionType;
} & React.InputHTMLAttributes<HTMLElement>) => {
  return (
    <div>
      {data.value}
      <input id={data.value} value={data.value} type="radio" {...props} />
    </div>
  );
};

export default Attempt;
