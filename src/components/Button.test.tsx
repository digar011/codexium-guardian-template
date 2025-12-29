import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

// Test suite for Button component
describe('Button', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant class', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('button--primary');
  });

  it('applies secondary variant class', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('button--secondary');
  });

  it('handles click event', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick} disabled>Click me</Button>);
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('logs error on click event exception', () => {
    console.error = jest.fn();
    const handleClick = jest.fn(() => { throw new Error('Test error'); });
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(console.error).toHaveBeenCalledWith('Error handling button click:', expect.any(Error));
  });
});