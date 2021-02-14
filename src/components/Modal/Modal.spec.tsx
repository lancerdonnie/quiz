import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
  beforeEach(() => {
    render(
      <Modal title="My new modal" open close={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
  });

  test('Expect modal title to render', () => {
    const text = screen.getByText('My new modal');
    expect(text).toBeInTheDocument();
  });

  test('Expect modal content to render', () => {
    const text = screen.getByText('Modal content');
    expect(text).toBeInTheDocument();
  });
});
