import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

const mockOnLoginSuccess = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders login form', () => {
  render(<Login onLoginSuccess={mockOnLoginSuccess} />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('validates empty form fields', () => {
  render(<Login onLoginSuccess={mockOnLoginSuccess} />);
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();
});

test('calls onLoginSuccess on successful login', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'mockToken' })
    })
  ) as jest.Mock;

  render(<Login onLoginSuccess={mockOnLoginSuccess} />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpassword' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await screen.findByText(/login/i);
  expect(mockOnLoginSuccess).toHaveBeenCalledWith('mockToken');
});

test('handles login failure', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false
    })
  ) as jest.Mock;

  render(<Login onLoginSuccess={mockOnLoginSuccess} />);
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpassword' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await screen.findByText(/login failed/i);
  expect(mockOnLoginSuccess).not.toHaveBeenCalled();
});