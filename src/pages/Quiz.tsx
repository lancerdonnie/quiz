import type { QuizType } from 'types';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Container from 'layout/Container';

type Props = {};

const Quiz = (props: Props) => {
  const quizzes: QuizType[] = useSelector((state: RootState) => state.quizzes);

  if (!quizzes.length) return <div>no quizzes available. Add a quiz?</div>;
  return (
    <Container>
      <div>
        {quizzes.map((e) => {
          return (
            <div key={e.id} className="flex items-center break-words">
              <span className="font-semibold w-72 inline-block">{e.name}</span>
              <Link to={`quiz/${e.id}`} className="ml-2 cursor-pointer">
                <Button hoverColor="green" icon="play">
                  Attempt
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Quiz;
