import React from 'react';
import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Trans.css';

interface Props {}
const x = ['blue', 'red', 'yellow', 'green'];
const Trans = (props: Props) => {
  const [state, setstate] = useState(0);
  return (
    <div className="h-full flex flex-col">
      <TransitionGroup className="h-screen absolute top-0 w-screen">
        <CSSTransition key={x[state]} timeout={600} classNames="trans">
          <div className={`h-full bg-${x[state]}-200`}></div>
        </CSSTransition>
      </TransitionGroup>
      <button className="fixed top-0 z-10" onClick={() => setstate(state + 1)}>
        change
      </button>
    </div>
  );
};

export default Trans;
