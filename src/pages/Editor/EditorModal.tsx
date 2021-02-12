import type { OptionType, QuizType } from 'types';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddQuiz } from 'redux/actions';
import { randomId } from 'utils';

type Props = {
  close: () => void;
};

const EditorModal = ({ close }: Props) => {
  const dispatch = useDispatch();
  const [state, setstate] = useState<QuizType>({ id: randomId(), name: '', quiz: [] });

  const [options, setOptions] = useState<OptionType[]>([]);
  const [optionsName, setOptionsName] = useState<string>('');
  const [questionName, setquestionName] = useState<string>('');

  return (
    <Modal title="Create Quiz" close={close}>
      <div>
        <input
          placeholder="Quiz Name"
          value={state.name}
          onChange={(e) => {
            setstate({ ...state, name: e.target.value });
          }}
        />
        <div>
          <input
            placeholder="Question Name"
            value={questionName}
            onChange={(e) => {
              setquestionName(e.target.value);
            }}
          />
          <div className="radio-buttons">
            {options.length < 5 && (
              <div>
                <input
                  placeholder="Option"
                  value={optionsName}
                  onChange={(e) => {
                    setOptionsName(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    if (!optionsName) {
                      //toast
                      return;
                    }
                    if (options.some((e) => e.value === optionsName)) {
                      //toast
                      return;
                    }
                    setOptions([...options, { value: optionsName, answer: false }]);
                    setOptionsName('');
                  }}
                >
                  Add Option
                </button>
              </div>
            )}
            {options.map((option) => {
              return (
                <div key={option.value}>
                  <span>{option.value}</span>
                  <input
                    type="checkbox"
                    checked={option.answer}
                    onChange={() => {
                      const r = options.map((e) => {
                        e.answer = false;
                        return e;
                      });
                      r.forEach((e) => {
                        if (e.value === option.value) e.answer = true;
                      });
                      setOptions(r);
                    }}
                  />
                  <i
                    className="fa fa-trash"
                    onClick={() => {
                      setOptions((op) => op.filter((e) => e.value !== option.value));
                    }}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              if (!questionName) {
                //toast
                return;
              }
              if (options.length < 2) {
                //toast
                return;
              }
              if (!options.some((e) => e.answer === true)) {
                //toast
                return;
              }
              setstate({ ...state, quiz: [...state.quiz, { id: randomId(), name: questionName, options }] });
              setquestionName('');
              setOptions([]);
            }}
          >
            Add
          </button>
        </div>
        <div>
          {state.quiz.map((e) => {
            return (
              <div key={e.name}>
                <div>QuestionName: {e.name}</div>
                <div>
                  {e.options.map((f) => {
                    return (
                      <div key={f.value}>
                        <span>{f.value}</span>
                        <span>{f.answer ? 'Answer' : null}</span>
                      </div>
                    );
                  })}
                </div>
                <i
                  className="fa fa-trash"
                  onClick={() => {
                    setstate((st) => ({ ...st, quiz: st.quiz.filter((g) => g.name !== e.name) }));
                  }}
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            if (!state.name) return; //toast
            if (!state.quiz.length) return; //toast
            dispatch(AddQuiz(state));
            close();
          }}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default EditorModal;
