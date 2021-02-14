import React from 'react';
import Close from 'components/Close/Close';
import Divider from 'components/Divider';
import { animated, useTransition } from 'react-spring';

type Props = {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  close: () => void;
};

const Modal = ({ open, close, title, children }: Props) => {
  const transitions = useTransition(open, null, {
    from: { transform: `translateY(-100%)`, opacity: 0 },
    enter: { transform: `translateY(0)`, opacity: 1 },
    leave: { transform: `translateY(100%)`, opacity: 0 },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <div
              key={item.toString()}
              style={{ background: 'rgba(0, 0, 0, 0.8)' }}
              className="fixed h-full top-0 right-0 left-0 bg-white p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <animated.div
                style={props}
                className="h-full bg-white flex flex-col overflow-hidden relative rounded"
              >
                <div className="px-4 py-2">{title}</div>
                <Divider />
                <div className="mt-4 px-4 flex-1 overflow-auto">{children}</div>
                <Close onClick={close} />
              </animated.div>
            </div>
          )
      )}
    </>
  );
};

export default Modal;
