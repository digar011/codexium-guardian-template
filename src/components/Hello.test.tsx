import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hello from './Hello';

describe('Hello Component', () => {
  it('renders hello message with name', () => {
    render(<Hello name="World" />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('renders error when name is not provided', () => {
    const { container } = render(<Hello name="" />);
    expect(container.textContent).toBe('Error: Name is required');
  });
});