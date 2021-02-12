import type { QuizType } from 'types';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { Link } from 'react-router-dom';

type Props = {};

const Quiz = (props: Props) => {
  const quizzes: QuizType[] = useSelector((state: RootState) => state.quizzes);

  if (!quizzes.length) return <div>no quizzes available. Add a quiz?</div>;
  return (
    <div>
      {quizzes.map((e) => {
        return (
          <div key={e.name}>
            <span>{e.name}</span>
            <Link to={`quiz/${e.id}`} className="ml-2 cursor-pointer">
              Attempt
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
