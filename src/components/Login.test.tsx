import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

jest.mock('jwt-decode', () => jest.fn(() => ({ exp: Date.now() / 1000 + 60 }))); // Mock jwtDecode

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('displays error on failed login', async () => {
    fetchMock.mockReject(new Error('Failed to login.'));

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    const errorMessage = await screen.findByText(/failed to login/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('successful login', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'valid.jwt.token' }));

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    const successMessage = await screen.findByText(/login successful!/i);
    expect(successMessage).toBeInTheDocument();
  });
});