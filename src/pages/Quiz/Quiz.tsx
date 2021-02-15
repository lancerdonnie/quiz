import type { QuizType } from 'types';
import type { RootState } from 'redux/reducer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'components/Button/Button';
import Container from 'layout/Container';
import Splash from 'pages/Splash/Splash';

const Quiz = () => {
  const quizzes: QuizType[] = useSelector((state: RootState) => state.quizzes);
  const showedSplash: boolean = useSelector((state: RootState) => state.showedSplash);

  return (
    <Container>
      {!showedSplash && <Splash />}
      {!quizzes.length ? (
        <div className="h-full flex flex-col justify-center items-center ">
          <span>No quizzes available. Go to </span>
          <span className="my-2">
            {
              <Link to={`/editor`} className="mx-2 cursor-pointer">
                <Button hoverColor="green" icon="text-width">
                  Editor
                </Button>
              </Link>
            }
          </span>
          <span> to create a quiz</span>
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
