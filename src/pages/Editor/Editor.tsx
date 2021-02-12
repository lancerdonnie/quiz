import type { QuizType } from 'types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import EditorModal from './EditorModal';

const Editor = () => {
  const quizzes: QuizType[] = useSelector((state: RootState) => state.quizzes);
  const [open, setOpen] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    setOpen(true);
  };

  if (!quizzes.length)
    return (
      <div>
        <div>
          Click the add button to add a quiz-set <button onClick={handleButtonClick}>Add</button>
        </div>
        {open && <EditorModal close={() => setOpen(false)} />}
      </div>
    );
  return (
    <div>
      <button onClick={handleButtonClick}>Add</button>
      <div>
        {quizzes.map((e) => {
          return (
            <div key={e.name}>
              <span>{e.name}</span>
              <span className="ml-2">View</span>
            </div>
          );
        })}
      </div>
      {open && <EditorModal close={() => setOpen(false)} />}
    </div>
  );
};

export default Editor;
