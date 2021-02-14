import { useState } from 'react';
import { useSpring, animated, useTrail } from 'react-spring';
import './Splash.scss';

const quiz = ['Q', 'u', 'i', 'z'];

const Splash = () => {
  const [toggle, setToggle] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [mount, setMount] = useState(true);

  const props = useSpring({ opacity: toggle ? 0 : 1, from: { opacity: 1 }, config: { duration: 1000 } });
  const trail = useTrail(quiz.length, {
    config: {
      mass: 5,
      tension: 2000,
      friction: 135,
      duration: 2000,
    },
    opacity: 1,
    x: 0,
    y: 1,
    from: {
      opacity: 0,
      x: -50,
      y: 0,
    },
    reverse,
    onRest: () => {
      if (reverse) {
        setToggle(true);
        setTimeout(() => {
          setMount(false);
        }, 1000);
      } else {
        setReverse(true);
      }
    },
  });

  return mount ? (
    <animated.div
      style={props}
      className="fixed top-0 h-screen w-screen bg-black splash text-white text-9xl flex items-center justify-center"
    >
      {trail.map(({ x, ...rest }, i) => (
        <animated.div
          key={quiz[i]}
          style={{
            ...rest,
            transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
          }}
        >
          {quiz[i]}
        </animated.div>
      ))}
    </animated.div>
  ) : null;
};

export default Splash;
