import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Button label="Click me" onClick={() => {}} />);
    expect(getByTestId('button-component')).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByTestId } = render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(getByTestId('button-component'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders the correct label', () => {
    const label = "Click me";
    const { getByText } = render(<Button label={label} onClick={() => {}} />);
    expect(getByText(label)).toBeTruthy();
  });

  // Test for variant prop
  it('applies the correct variant class', () => {
    const { getByTestId } = render(<Button label="Click me" onClick={() => {}} variant="secondary" />);
    expect(getByTestId('button-component')).toHaveClass('btn-secondary');
  });
});