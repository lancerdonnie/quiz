import Input from 'components/Input/Input';
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
    <div>
      {options.map((option) => {
        return (
          <div key={option.value} className="flex items-center justify-center">
            <span>{option.value}</span>
            <Input
              className="ml-2"
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
        );
      })}
    </div>
  );
};

export default Options;
