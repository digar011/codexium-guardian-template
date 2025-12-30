import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

jest.mock('jwt-decode', () => () => ({ email: 'test@example.com', exp: Date.now() + 10000 }));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'fake-jwt-token' }),
  })
) as jest.Mock;

describe('Login Component', () => {
  test('renders login form', () => {
    const { getByLabelText } = render(<Login />);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('handles login success', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
  });

  test('handles login failure', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    const { getByLabelText, getByText, findByText } = render(<Login />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    expect(await findByText(/login failed/i)).toBeInTheDocument();
  });
});
