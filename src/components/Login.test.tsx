import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

jest.mock('jwt-decode', () => () => ({ username: 'testuser', exp: Date.now() / 1000 + 60 }));

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'fake-jwt-token' })
    })
  ) as jest.Mock;
});

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('allows users to log in successfully', async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText(/welcome, testuser!/i)).toBeInTheDocument();
  });

  test('displays error on login failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
  });
});