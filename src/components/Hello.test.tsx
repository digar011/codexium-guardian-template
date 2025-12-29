import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hello from './Hello';

// Test suite for Hello component
describe('Hello Component', () => {
  test('renders with valid name', () => {
    render(<Hello name="World" />);
    // Check if the greeting message is correct
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('throws error with empty name', () => {
    // Expect an error to be thrown for empty name
    expect(() => render(<Hello name="" />)).toThrow('Name is required');
  });
});
