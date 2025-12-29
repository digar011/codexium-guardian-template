import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Hello from './Hello';

// Test suite for Hello component
describe('Hello Component', () => {
  test('renders greeting with name', () => {
    render(<Hello name="World" />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  test('renders error message when name is not provided', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Hello name="" />);
    expect(screen.getByText('Error: Name is required')).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith('Name prop is required for Hello component');
    consoleSpy.mockRestore();
  });
});
