import React from 'react';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const types = {
  default: '',
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-yellow-400',
};

export const Toast = ({
  duration = 2000,
  msg = 'Default message',
  type = 'default',
  className,
}: {
  duration?: null | number;
  msg?: string;
  className?: string;
  type?: 'default' | 'success' | 'error' | 'warning';
}) => {
  toaster.notify(
    ({ onClose }) => (
      <div className={`${className} ${types[type]} p-2 px-4 rounded border border-solid border-gray-400`}>
        <span className="font-bold">{msg}</span>
        <i className="fa fa-times cursor-pointer ml-2" onClick={onClose}></i>
      </div>
    ),
    {
      duration,
    }
  );
};

export default Toast;
