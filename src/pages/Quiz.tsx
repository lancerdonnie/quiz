import type { QuizType } from 'types';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Container from 'layout/Container';

const Quiz = () => {
  const quizzes: QuizType[] = useSelector((state: RootState) => state.quizzes);

  return (
    <Container>
      {!quizzes.length ? (
        <div className="h-full flex justify-center items-center">
          <span>No quizzes available. Go to </span>
          {
            <Link to={`/editor`} className="mx-2 cursor-pointer">
              <Button hoverColor="green" icon="text-width">
                Editor
              </Button>
            </Link>
          }
          <span> to add a quiz?</span>
        </div>
      ) : (
        <div>
          {quizzes.map((e) => {
            return (
              <div key={e.id} className="flex items-center break-words mb-4">
                <span className="font-semibold w-60 inline-block">{e.name}</span>
                <Link to={`/quiz/${e.id}`} className="ml-2 cursor-pointer">
                  <Button hoverColor="green" icon="play">
                    Attempt
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default Quiz;
