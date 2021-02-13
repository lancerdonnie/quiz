import Divider from 'components/Divider';
import Container from 'layout/Container';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { QuizHistory } from 'types';

const History = () => {
  const history: QuizHistory[] = useSelector(({ history }: RootState) => history);

  return (
    <Container>
      <div>
        {history.map((h) => {
          return (
            <div key={h.time.toString()} className="mb-4">
              <div>Name: {h.name}</div>
              <div>Completed: {h.time.toString().split(' GMT')[0]}</div>
              <div className="mb-3">
                You scored {h.score} out of {h.total}
              </div>
              <Divider />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default History;