import { render, screen } from '@testing-library/react';
import History from './History';
import Wrapper from 'fixtures/Wrapper';

describe('History Page', () => {
  render(
    <Wrapper>
      <History />
    </Wrapper>
  );
  test('Expect history to render data', () => {
    const text = screen.getByText(/my test/i);
    expect(text).toBeInTheDocument();
  });
});
