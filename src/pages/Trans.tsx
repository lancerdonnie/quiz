import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RootState } from 'redux/reducer';
import { OptionType, QuizType } from 'types';
import './Trans.scss';

// const x = ['blue', 'red', 'yellow', 'green', 'gray', 'indigo', 'purple', 'pink'];
const x = ['', '', '', '', '', '', '', ''];

const Trans = () => {
  const [state, setstate] = useState(0);
  const [dir, setDir] = useState(true);
  const [done, setDone] = useState(false);

  const { id, name, quiz }: QuizType = useSelector(({ quizzes }: RootState) =>
    quizzes.find((e: QuizType) => e.id === '6cHwzAhBqbMcD-ChWwAeY')
  );

  const [answers, setAnswers] = useState<{ id: string; answer?: string; value: string }[]>(() => {
    if (!quiz) return [];
    return quiz.map((e) => ({ id: e.id, value: '', answer: e.options.find((op) => op.answer === true)?.value }));
  });

  const [count, setCount] = useState(0);

  return (
    <div className="h-full flex flex-col">
      <div className={`b ${dir ? 'forward' : 'backward'} h-screen absolute top-0 w-screen overflow-hidden bg-white`}>
        <TransitionGroup component={null}>
          <CSSTransition key={state} timeout={600} classNames="trans">
            <div className={`h-full bg-${x[state]}-200 trans flex items-center justify-start`}>
              {count !== quiz.length ? (
                <div className="ml-8">
                  <div className="text-xl mb-4">{quiz[count].name}</div>
                  <div>
                    {quiz[count].options.map((o) => {
                      return (
                        <Option
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
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (answers.some((ans) => !ans.value)) return; //toast no answer on one
                    setDone(true);
                  }}
                >
                  submit
                </button>
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div className="fixed bottom-0.5 right-0.5 z-10">
        <i
          className={`fa fa-chevron-up cursor-pointer bg-red-300 hover:bg-red-200 transition duration-100 ease-out p-2 rounded-l border-r border-solid border-gray-400  ${
            count === 0 ? 'pointer-events-none opacity-50' : ''
          }`}
          onClick={() => {
            if (state === 0) {
              setstate(x.length - 1);
            } else {
              setstate(state - 1);
            }
            if (count === 0) {
              setCount(quiz.length - 1);
            } else {
              setCount(count - 1);
            }
            setDir(true);
          }}
        ></i>
        <i
          className={`fas fa-chevron-down cursor-pointer bg-red-300 hover:bg-red-200 transition duration-100 ease-out p-2 rounded-r ${
            count === quiz.length ? 'pointer-events-none opacity-50' : ''
          }`}
          onClick={() => {
            if (state === x.length - 1) {
              setstate(0);
            } else {
              setstate(state + 1);
            }
            // if (count === quiz.length - 1) {
            if (count === quiz.length) {
              setCount(0);
            } else {
              setCount(count + 1);
            }
            setDir(false);
          }}
        ></i>
        <span className="ml-2 cursor-pointer" onClick={() => setstate(0)}>
          reset
        </span>
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
    <div className="radio-input">
      <input id={data.value} value={data.value} type="radio" {...props} />
      <label htmlFor={data.value}>{data.value}</label>
    </div>
  );
};

export default Trans;
