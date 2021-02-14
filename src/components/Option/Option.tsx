import React from 'react';
import { OptionType } from 'types';
import './Option.scss';

const Option = ({
  done,
  data,
  ...props
}: {
  data: OptionType;
  done: boolean;
} & React.InputHTMLAttributes<HTMLElement>) => {
  // const showAnswer = done && data.answer && !props.checked;
  const showAnswer = done && data.answer;
  const cx2 = done && props.checked ? 'bg-red-200' : 'bg-blue-200 hover:bg-blue-300';
  const cx = showAnswer ? 'bg-green-200' : cx2;

  return (
    <div className="radio-input text-blue-700">
      <input
        className="p-0 mb-0 cursor-pointer hidden"
        id={data.value}
        value={data.value}
        type="radio"
        {...props}
      />
      <label
        className={`${cx} relative cursor-pointer p-1 px-3 mr-10 inline-block w-full rounded transition duration-100 ease-out`}
        htmlFor={data.value}
      >
        {data.value}
      </label>
    </div>
  );
};

export default Option;
