import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

describe('Button component', () => {
  test('renders the button with primary variant by default', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    expect(button).toHaveClass('button--primary');
  });

  test('renders the button with secondary variant', () => {
    const { getByRole } = render(<Button variant="secondary">Click me</Button>);
    const button = getByRole('button');
    expect(button).toHaveClass('button--secondary');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled button', () => {
    const { getByRole } = render(<Button disabled>Click me</Button>);
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });
});