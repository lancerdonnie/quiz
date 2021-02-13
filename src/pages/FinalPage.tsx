import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';

interface Props {
  answers: { id: string; answer?: string; value: string }[];
}

const getResult = (total: number, scored: number): string => {
  const average = (total / scored) * 100;
  if (average === 50) return 'You did alright. There is room for improvement';
  if (average < 50) return 'You have a low score. Study harder!';
  if (average === 100) return 'You have a perfect score. Congratulations genius!';
  else return 'You have a good score';
};

const FinalPage = ({ answers }: Props) => {
  const score = answers.filter(({ value, answer }) => value === answer).length;
  const total = answers.length;

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="font-bold text-lg mb-8">Final Score</div>
      <div className="mb-4">
        Scored {score} out of {total}
      </div>
      <div className="font-bold">{getResult(score, total)}</div>
      <div className="mt-8">
        {answers.map(({ id, value, answer }) => (
          <i key={id} className={`fa fa-trophy text-${value === answer ? 'green' : 'red'}-400 text-3xl mr-1`}></i>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/">
          <Button hoverColor="blue" icon="home">
            Done
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinalPage;
