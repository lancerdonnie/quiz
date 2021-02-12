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
                    <>
                      <Option
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
                      {answers.find}
                    </>
                  );
                })}
                {/* {done && <div>{answers.find()}</div>} */}
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
            if (answers.some((ans) => ans)) return; //toast no answer on one
            setDone(true);
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
};

const Option = ({
  data,
  name,
  onChange,
  checked,
}: {
  data: OptionType;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      {data.value}
      <input id={data.value} value={data.value} checked={checked} name={name} type="radio" onChange={onChange} />
    </div>
  );
};

export default Attempt;
