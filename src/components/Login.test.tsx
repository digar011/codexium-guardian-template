import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

jest.mock('jwt-decode', () => () => ({ username: 'mockUser' }));

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: 'mockToken' })
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders login form and submits successfully', async () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(submitButton);

  expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.anything());
  await screen.findByText(/logged in as: mockUser/i);
});