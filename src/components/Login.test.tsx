import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

jest.mock('jwt-decode', () => jest.fn(() => ({
  user: {
    id: '123',
    name: 'Test User'
  }
})));

describe('Login Component', () => {
  it('renders login form', () => {
    render(<Login onLoginSuccess={jest.fn()} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('displays error message on failed login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({})
      })
    );

    render(<Login onLoginSuccess={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const errorMessage = await screen.findByText(/login failed/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls onLoginSuccess on successful login', async () => {
    const mockOnLoginSuccess = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'testToken' })
      })
    );

    render(<Login onLoginSuccess={mockOnLoginSuccess} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await screen.findByRole('button', { name: /login/i });
    expect(mockOnLoginSuccess).toHaveBeenCalledWith({
      user: {
        id: '123',
        name: 'Test User'
      }
    });
  });
});
