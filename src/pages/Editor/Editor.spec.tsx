import { render, screen } from '@testing-library/react';
import Editor from './Editor';
import Wrapper from 'fixtures/Wrapper';

describe('Editor Page', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <Editor />
      </Wrapper>
    );
  });

  test('Expect history to render data', () => {
    const text = screen.getAllByText(/View/i);
    expect(text).toHaveLength(2);
  });

  test('Expect add quiz button to show', () => {
    const text = screen.getByText(/Add Quiz/i);
    expect(text).toBeInTheDocument();
  });
});
