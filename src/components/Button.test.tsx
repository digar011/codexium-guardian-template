import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('should render correctly with primary variant', () => {
    const { getByText } = render(<Button variant="primary" onClick={() => {}}>Click Me</Button>);
    const button = getByText('Click Me');
    expect(button).toHaveClass('button-primary');
  });

  it('should render correctly with secondary variant', () => {
    const { getByText } = render(<Button variant="secondary" onClick={() => {}}>Click Me</Button>);
    const button = getByText('Click Me');
    expect(button).toHaveClass('button-secondary');
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button variant="primary" onClick={handleClick}>Click Me</Button>);
    const button = getByText('Click Me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button variant="primary" onClick={handleClick} disabled>Click Me</Button>);
    const button = getByText('Click Me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
