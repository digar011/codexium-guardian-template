import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  const onLoginSuccessMock = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders login form', () => {
    render(<Login onLoginSuccess={onLoginSuccessMock} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('displays error with invalid credentials', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });

    render(<Login onLoginSuccess={onLoginSuccessMock} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('calls onLoginSuccess on successful login', async () => {
    const fakeToken = 'fake-jwt-token';
    fetchMock.mockResponseOnce(JSON.stringify({ token: fakeToken }), { status: 200 });

    render(<Login onLoginSuccess={onLoginSuccessMock} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'correctpassword' } });
    fireEvent.click(screen.getByText(/login/i));

    await screen.findByText(/login/i);

    expect(onLoginSuccessMock).toHaveBeenCalledWith(fakeToken);
  });
});