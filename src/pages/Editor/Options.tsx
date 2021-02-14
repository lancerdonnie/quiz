import React from 'react';
import { OptionType } from 'types';

interface Props {
  options: OptionType[];
  setOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
}

const Options = ({ options, setOptions }: Props) => {
  const onChangeOption = (option: OptionType) => {
    const r = options.map((e) => {
      e.answer = false;
      return e;
    });
    r.forEach((e) => {
      if (e.value === option.value) e.answer = true;
    });
    setOptions(r);
  };

  return (
    <div className="mt-2">
      {options.map((option) => {
        return (
          <div
            key={option.value}
            className="flex items-center justify-between bg-gray-200 rounded p-1 px-2 mb-1"
          >
            <span className="break-all">{option.value}</span>
            <div className="flex items-center justify-center">
              <input
                className="ml-2 cursor-pointer"
                type="checkbox"
                checked={option.answer}
                onChange={() => onChangeOption(option)}
              />
              <i
                className="fa fa-trash ml-2 cursor-pointer text-red-700"
                onClick={() => {
                  setOptions((op) => op.filter((e) => e.value !== option.value));
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Options;
