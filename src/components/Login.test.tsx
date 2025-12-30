// Import necessary dependencies
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

// Test suite for Login component
describe('Login Component', () => {
  test('renders login form', () => {
    const { getByLabelText, getByText } = render(<Login />);
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  test('displays error on invalid credentials', async () => {
    const { getByLabelText, getByText, findByText } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'invalidUser' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'invalidPass' } });
    fireEvent.click(getByText(/login/i));

    const errorMessage = await findByText(/an error occurred/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('logs user on valid credentials', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    console.log = jest.fn();

    fireEvent.change(getByLabelText(/username/i), { target: { value: 'user' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(getByText(/login/i));

    await waitFor(() => expect(console.log).toHaveBeenCalledWith(expect.stringContaining('User decoded:')));
  });
});
