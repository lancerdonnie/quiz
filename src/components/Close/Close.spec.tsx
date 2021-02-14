import { render, screen, configure } from '@testing-library/react';
import Close from './Close';

describe('Close Component', () => {
  beforeEach(() => {
    render(<Close />);
  });

  test('Expect close button to render', () => {
    const text = screen.getByTestId('close');
    expect(text).toBeInTheDocument();
  });
});
