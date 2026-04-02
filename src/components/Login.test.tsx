import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

jest.mock('jwt-decode', () => () => ({
  sub: '1234567890',
  name: 'John Doe',
  iat: 1516239022,
}));

const mockFetch = jest.fn();

beforeEach(() => {
  global.fetch = mockFetch;
});

afterEach(() => {
  jest.clearAllMocks();
});

it('renders the login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

it('shows error message on failed login', async () => {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ message: 'Invalid credentials' }),
  });

  render(<Login />);

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  const errorMessage = await screen.findByText(/invalid credentials/i);
  expect(errorMessage).toBeInTheDocument();
});