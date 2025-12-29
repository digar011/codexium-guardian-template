import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hello from './Hello';

// Test to check if the Hello component renders the name
it('renders the name passed as prop', () => {
  render(<Hello name="World" />);
  const helloElement = screen.getByText(/Hello, World!/i);
  expect(helloElement).toBeInTheDocument();
});

// Test to check error handling when name is not provided
it('renders error message when name is not provided', () => {
  render(<Hello name="" />);
  const errorElement = screen.getByText(/Error: Name is required/i);
  expect(errorElement).toBeInTheDocument();
});
