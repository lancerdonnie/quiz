import React from 'react';

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: Props) => {
  return (
    <div className={className}>
      <input
        {...props}
        className={`w-full border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-indigo-200 `}
      />
    </div>
  );
};

export default Input;
