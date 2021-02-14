import type { RootState } from 'redux/reducer';
import type { Answer, QuizType } from 'types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FinalPage from './FinalPage';
import AttemptFooter from './AttemptFooter';
import Option from 'components/Option/Option';
import { useTransition, animated } from 'react-spring';

const Attempt = () => {
  const { id: queryId } = useParams<{ id: string }>();
  const history = useHistory();

  const [dir, setDir] = useState(false);
  const [done, setDone] = useState(false);

  const { id, name, quiz }: QuizType = useSelector(({ quizzes }: RootState) =>
    quizzes.find((e: QuizType) => e.id === queryId)
  );

  const [answers, setAnswers] = useState<Answer[]>(() => {
    if (!quiz) return [];
    return quiz.map((e) => ({
      id: e.id,
      value: '',
      answer: e.options.find((op) => op.answer === true)?.value,
    }));
  });

  const [count, setCount] = useState(0);

  const transitions = useTransition(count, (p) => p, {
    from: () => ({ opacity: 1, transform: `translate3d(0,${dir ? '-' : ''}100vh,0)` }),
    enter: { opacity: 1, transform: 'translate3d(0,0vh,0)' },
    leave: () => ({ opacity: 1, transform: `translate3d(0,${dir ? '' : '-'}100vh,0)` }),
  });

  if (!quiz) history.push('/');

  return (
    <div className="h-full flex flex-col">
      <div className={`b h-screen fixed top-0 w-screen overflow-hidden bg-white`}>
        {transitions.map(({ item: count, props, key }) => {
          return (
            <animated.div
              key={key}
              style={props}
              className={`h-full w-full flex items-center justify-start absolute`}
            >
              {count !== quiz.length ? (
                <div className="ml-10 relative">
                  <div className="text-xl mb-4">
                    <span className="absolute left-0 -ml-8">{count + 1}</span>
                    <span>{quiz[count].name}</span>
                  </div>
                  <div>
                    {quiz[count].options.map((o) => {
                      return (
                        <Option
                          done={done}
                          checked={
                            answers.find((ans) => ans.id === quiz[count].id)?.value === o.value ? true : false
                          }
                          key={o.value}
                          data={o}
                          name={quiz[count].id}
                          onChange={() => {
                            const copy = [...answers];
                            copy.forEach((a) => {
                              if (a.id === quiz[count].id) {
                                a.value = o.value;
                              }
                            });
                            setAnswers(copy);
                            if (count !== quiz.length - 1) {
                              setTimeout(() => {
                                setDir(false);
                                setCount(count + 1);
                              }, 150);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <FinalPage answers={answers} />
              )}
            </animated.div>
          );
        })}
      </div>
      <AttemptFooter
        id={id}
        name={name}
        answers={answers}
        count={count}
        done={done}
        quiz={quiz}
        setAnswers={setAnswers}
        setCount={setCount}
        setDir={setDir}
        setDone={setDone}
      />
    </div>
  );
};

export default Attempt;
