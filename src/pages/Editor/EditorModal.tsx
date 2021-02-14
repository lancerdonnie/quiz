import type { OptionType, QuizType } from 'types';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddQuiz } from 'redux/actions';
import { randomId } from 'utils';
import Input from 'components/Input';
import Button from 'components/Button';
import QuestionsView from './QuestionsView';
import Toast from 'components/Toast';

type Props = {
  open: boolean;
  close: () => void;
};

const EditorModal = ({ open, close }: Props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState<QuizType>({
    id: randomId(),
    name: '',
    quiz: [
      {
        id: 'WAM_eNHT-slfZy4qY2jUC',
        name: 'What is a bacteria',
        options: [
          { value: 'animal', answer: false },
          { value: 'horse', answer: true },
        ],
      },
    ],
  });

  const [options, setOptions] = useState<OptionType[]>([]);
  const [optionsName, setOptionsName] = useState<string>('');
  const [questionName, setquestionName] = useState<string>('');

  return (
    <Modal open={open} title="Create Quiz" close={close}>
      <div className="flex h-full pb-4 sm:flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div style={{ width: 350 }} className="flex flex-col">
            <Input
              className="w-full"
              placeholder="Quiz Name"
              value={state.name}
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
              }}
            />
            <div className="flex flex-col items-center justify-center border border-gray-300 rounded p-2">
              <Input
                className="w-full"
                placeholder="Question Name"
                value={questionName}
                onChange={(e) => {
                  setquestionName(e.target.value);
                }}
              />
              <div className="radio-buttons">
                {options.length < 5 && (
                  <div className="flex items-center">
                    <Input
                      placeholder="Option"
                      value={optionsName}
                      onChange={(e) => {
                        setOptionsName(e.target.value);
                      }}
                    />
                    <Button
                      className="ml-2"
                      icon="plus"
                      onClick={() => {
                        if (!optionsName) {
                          Toast({ msg: 'Type in your desired option', type: 'warning' });
                          return;
                        }
                        if (options.some((e) => e.value === optionsName)) {
                          Toast({ msg: "You can't have duplicate options", type: 'warning' });
                          return;
                        }
                        setOptions([...options, { value: optionsName, answer: false }]);
                        setOptionsName('');
                      }}
                    >
                      <span className="flex flex-col items-center">
                        <span>Add</span>
                        <span>Option</span>
                      </span>
                    </Button>
                  </div>
                )}
                <div>
                  {options.map((option) => {
                    return (
                      <div key={option.value} className="flex items-center justify-center">
                        <span>{option.value}</span>
                        <Input
                          className="ml-2"
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
                          className="fa fa-trash ml-2 cursor-pointer text-red-700"
                          onClick={() => {
                            setOptions((op) => op.filter((e) => e.value !== option.value));
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <Button
                className="mt-2 w-36"
                icon="plus"
                hoverColor="blue"
                onClick={() => {
                  if (!questionName) {
                    Toast({ msg: 'Please add a question name', type: 'warning' });
                    return;
                  }
                  if (options.length < 2) {
                    Toast({ msg: 'Please add at least two options', type: 'warning' });
                    return;
                  }
                  if (!options.some((e) => e.answer === true)) {
                    Toast({ msg: 'Please pick one option as the answer to your question', type: 'warning' });
                    return;
                  }
                  setState({
                    ...state,
                    quiz: [...state.quiz, { id: randomId(), name: questionName, options }],
                  });
                  setquestionName('');
                  setOptions([]);
                }}
              >
                Add
              </Button>
            </div>
            <div className="mt-4">
              <Button
                className="w-full"
                icon="clipboard-list"
                hoverColor="green"
                onClick={() => {
                  if (!state.quiz.length)
                    return Toast({ msg: 'The quiz should have at least one question', type: 'warning' });
                  if (!state.name)
                    return Toast({ msg: 'Please enter a name for your quiz', type: 'warning' });
                  dispatch(AddQuiz(state));
                  close();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className="w-0.5 bg-gray-200 h-full sm:hidden"></div>
        <QuestionsView setState={setState} state={state} />
      </div>
    </Modal>
  );
};

export default EditorModal;
