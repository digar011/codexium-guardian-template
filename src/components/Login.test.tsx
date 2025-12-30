import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

jest.mock('jwt-decode', () => jest.fn(() => ({ username: 'testuser' })));

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect((usernameInput as HTMLInputElement).value).toBe('testuser');
    expect((passwordInput as HTMLInputElement).value).toBe('password');
  });

  test('displays error message on login failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Login failed' }),
      })
    ) as jest.Mock;

    render(<Login />);

    fireEvent.click(screen.getByText('Login'));

    const errorMessage = await screen.findByText('Login failed');
    expect(errorMessage).toBeInTheDocument();
  });
});