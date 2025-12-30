import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

jest.mock('jwt-decode', () => () => ({ exp: Date.now() / 1000 + 1000 }));

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays error on failed login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({})
      })
    ) as jest.Mock;

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const errorMessage = await screen.findByText(/authentication failed/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('saves token on successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fake-jwt-token' })
      })
    ) as jest.Mock;

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await screen.findByRole('button', { name: /login/i });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-jwt-token');
  });
});
