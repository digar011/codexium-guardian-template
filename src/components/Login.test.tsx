import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

jest.mock('jwt-decode', () => () => ({ user: 'test-user' }));

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect((usernameInput as HTMLInputElement).value).toBe('testuser');
  });

  test('displays error on invalid login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' })
      })
    ) as jest.Mock;

    render(<Login />);
    fireEvent.submit(screen.getByRole('button'));
    const errorMessage = await screen.findByText('Invalid credentials');
    expect(errorMessage).toBeInTheDocument();
  });
});