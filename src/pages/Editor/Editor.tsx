import type { QuizType } from 'types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import EditorModal from './EditorModal';
import Container from 'layout/Container';
import Button from 'components/Button/Button';
import { DeleteQuiz } from 'redux/actions';
import EditorQuizViewer from './EditorQuizViewer';

const Editor = () => {
  const dispatch = useDispatch();
  const quizzes: QuizType[] = useSelector((state: RootState) => state.quizzes);
  const [open, setOpen] = useState(false);
  const [viewerData, setViewerData] = useState<QuizType>();
  const [openViewer, setOpenViewer] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    setOpen(true);
  };

  return (
    <Container>
      {!quizzes.length ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-xl mb-4">You have no quizzes yet. Add a quiz</div>
          <div>
            <Button hoverColor="purple" icon="plus" onClick={handleButtonClick}>
              Add Quiz
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Button hoverColor="purple" icon="plus" onClick={handleButtonClick}>
            Add Quiz
          </Button>
          <div className="mt-4">
            {quizzes.map(({ id, name }) => {
              return (
                <div key={id} className="flex items-center break-words mb-2">
                  <span className="font-semibold w-60 inline-block">{name}</span>
                  <Button
                    icon="eye"
                    hoverColor="indigo"
                    className="ml-2"
                    onClick={() => {
                      setViewerData(quizzes.find((quiz) => quiz.id === id));
                      setOpenViewer(true);
                    }}
                  >
                    View
                  </Button>
                  <i
                    className="fa fa-trash cursor-pointer ml-3 text-red-600"
                    onClick={() => {
                      if (!window.confirm('Are you sure you want to delete this quiz?')) return;
                      dispatch(DeleteQuiz(id));
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <EditorModal open={open} close={() => setOpen(false)} />
      {viewerData && (
        <EditorQuizViewer open={openViewer} data={viewerData} close={() => setOpenViewer(false)} />
      )}
    </Container>
  );
};

export default Editor;
