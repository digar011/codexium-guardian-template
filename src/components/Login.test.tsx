import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

jest.mock('jwt-decode', () => jest.fn(() => ({ sub: 'test-user' })));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'fake-jwt-token' })
  })
) as jest.Mock;

describe('Login component', () => {
  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(<Login />);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.anything());
    });
  });

  it('handles login failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject(new Error('Login failed'))
      })
    ) as jest.Mock;

    const { getByLabelText, getByText, findByText } = render(<Login />);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    const errorMessage = await findByText(/login failed/i);
    expect(errorMessage).toBeInTheDocument();
  });
});