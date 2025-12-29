import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

// Test cases for the Button component

describe('Button component', () => {
  it('renders primary button with correct text', () => {
    render(<Button variant="primary" onClick={() => {}}>Primary Button</Button>);
    const buttonElement = screen.getByText(/Primary Button/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders secondary button with correct text', () => {
    render(<Button variant="secondary" onClick={() => {}}>Secondary Button</Button>);
    const buttonElement = screen.getByText(/Secondary Button/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" onClick={handleClick} disabled>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies the correct class for primary variant', () => {
    render(<Button variant="primary" onClick={() => {}}>Primary Button</Button>);
    const buttonElement = screen.getByText(/Primary Button/i);
    expect(buttonElement).toHaveClass('bg-blue-500');
  });

  it('applies the correct class for secondary variant', () => {
    render(<Button variant="secondary" onClick={() => {}}>Secondary Button</Button>);
    const buttonElement = screen.getByText(/Secondary Button/i);
    expect(buttonElement).toHaveClass('bg-gray-500');
  });
});