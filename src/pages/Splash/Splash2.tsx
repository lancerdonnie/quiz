import React, { useState } from 'react';
import { useTransition, animated, interpolate, useTrail, useSpring } from 'react-spring';
import './Splash.scss';
//https://codepen.io/r00bal/details/JjKzoQg

const Hello = ['Q', 'u', 'i', 'z'];
const by = ['B', 'y'];
const jide = ['J', 'i', 'd', 'e'];

function Trail({ open, children, ...props }: any) {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 135 },
    opacity: 1,
    x: 1,
    y: 1,

    from: {
      opacity: 0,
      x: 0,
      y: 0,
    },
  });
  return (
    <>
      {trail.map(({ x, y, ...rest }, index) => (
        <animated.div
          // @ts-ignore
          key={items[index]}
          className="trails-text"
          style={{
            ...rest,
            transform: interpolate(
              [
                x.interpolate({
                  range: [0, 0.9, 1],
                  output: [0, 1.2, 1],
                }),
                y.interpolate({
                  range: [0, 0.9, 1],
                  output: [0, 0.8, 1],
                }),
              ],
              (x, y) => `scale(${x},${y})`
            ),

            // r.interpolate((r) => `rotate(${r}deg)`)
          }}
        >
          {items[index]}
        </animated.div>
      ))}
    </>
  );
}

const SqueezeSpring = ({ children }: any) => {
  const [state, toggle] = useState(false);
  // @ts-ignore
  const { x, y } = useSpring({
    from: { x: !state ? 1 : 0, y: !state ? 1 : 0 },
    to: { x: 1, y: 1 },
    config: { mass: 0.5, tension: 120, friction: 2, precision: 0.001 },
    reset: state,
    onStart: (state: any) => toggle(false),
  });

  return (
    <animated.div
      onMouseEnter={() => toggle(true)}
      style={{
        transform: interpolate(
          [
            x.interpolate({
              range: [0, 0.3, 1],
              output: [1, 1.3, 1],
            }),
            y.interpolate({
              range: [0, 0.3, 1],
              output: [1, 0.7, 1],
            }),
          ],
          (x, y) => `scale(${x},${y})`
        ),
      }}
    >
      {children}
    </animated.div>
  );
};

const Splash = () => {
  return (
    <h1 className="header fixed top-0 h-screen w-screen bg-black flex items-center justify-center">
      <Trail>
        {Hello.map((word) => (
          <SqueezeSpring className="letter">{word}</SqueezeSpring>
        ))}{' '}
        &nbsp;&nbsp;
        {by.map((word) => (
          <SqueezeSpring>{word}</SqueezeSpring>
        ))}{' '}
        &nbsp;&nbsp;
        {jide.map((word) => (
          <SqueezeSpring>{word}</SqueezeSpring>
        ))}
      </Trail>
    </h1>
  );
};

// const Splash = () => {
//   const [items, set] = useState(['Q', 'U', 'I', 'Z']);

//   const transitions = useTransition(items, (item) => item, {
//     from: { transform: 'translate3d(0,-40px,0)' },
//     enter: { transform: 'translate3d(0,0px,0)' },
//     leave: { transform: 'translate3d(0,-40px,0)' },
//   });

//   return (
//     <div className="fixed top-0 h-screen w-screen bg-black splash text-white text-9xl flex items-center justify-center">
//       {transitions.map(({ item, props, key }) => (
//         <animated.div key={item} style={props}>
//           {item}
//         </animated.div>
//       ))}
//     </div>
//   );
// };

export default Splash;
