import React from 'react';

type Props = {
  children: React.ReactNode;
  hoverColor?: string;
  icon?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

const Button = ({ children, className, hoverColor = 'red', icon = '', ...props }: Props) => {
  return (
    <span
      className={`inline-block rounded-md cursor-pointer px-5 py-2 border border-solid border-gray-300 hover:bg-${hoverColor}-300 hover:text-white hover:border-transparent transition duration-300 ease-in-out ${className}`}
      {...props}
    >
      <i className={`pr-1.5 mr-1 fa fa-${icon}`} />
      {children}
    </span>
  );
};

export default Button;
