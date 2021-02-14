import { render, screen } from '@testing-library/react';
import Quiz from './Quiz';
import Wrapper from 'fixtures/Wrapper';

describe('Quiz Page', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <Quiz />
      </Wrapper>
    );
  });

  test('Expect quiz page to render data', () => {
    const text = screen.getByText(/First Quiz/i);
    expect(text).toBeInTheDocument();
  });

  test('Expect Attempt button to show', () => {
    const text = screen.getAllByText('Attempt');
    expect(text).toHaveLength(2);
  });
});
