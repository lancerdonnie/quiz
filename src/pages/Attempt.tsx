import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RootState } from 'redux/reducer';
import { QuizType } from 'types';
import FinalPage from './FinalPage';
import QuizFooter from './QuizFooter';
import Option from './Option';
import './Attempt.scss';

const Attempt = () => {
  const { id: queryId } = useParams<{ id: string }>();
  const history = useHistory();

  const [dir, setDir] = useState(true);
  const [done, setDone] = useState(false);

  const { id, name, quiz }: QuizType = useSelector(({ quizzes }: RootState) => quizzes.find((e: QuizType) => e.id === queryId));

  const [answers, setAnswers] = useState<{ id: string; answer?: string; value: string }[]>(() => {
    if (!quiz) return [];
    return quiz.map((e) => ({ id: e.id, value: '', answer: e.options.find((op) => op.answer === true)?.value }));
  });

  const [count, setCount] = useState(0);

  if (!quiz) history.push('/');

  return (
    <div className="h-full flex flex-col">
      <div className={`b ${dir ? 'forward' : 'backward'} h-screen absolute top-0 w-screen overflow-hidden bg-white`}>
        <TransitionGroup component={null}>
          <CSSTransition key={count} timeout={600} classNames="trans">
            <div className={`h-full trans flex items-center justify-start`}>
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
                          disabled={done}
                          checked={answers.find((ans) => ans.id === quiz[count].id)?.value === o.value ? true : false}
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
                              }, 250);
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
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <QuizFooter
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
