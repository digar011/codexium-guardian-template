import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

// Mock jwtDecode for testing
jest.mock('jwt-decode', () => jest.fn(() => ({ exp: 9999999999, iat: 1234567890 })));

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('shows error on invalid credentials', async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'credentials' } });
    fireEvent.click(screen.getByText(/login/i));

    const errorMessage = await screen.findByText(/login failed/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('logs in with correct credentials', async () => {
    console.log = jest.fn(); // Mock console.log
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for async call

    expect(console.log).toHaveBeenCalledWith('Login successful');
  });
});
