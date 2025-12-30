import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('displays the generic error message when login fails', async () => {
    const mockLogin = jest.fn();
    mockLogin.mockRejectedValue(new Error('Login failed'));

    render(<Login onLogin={mockLogin} />);

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'user' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByTestId('login-button'));

    expect(await screen.findByTestId('login-error')).toHaveTextContent('Login failed. Please try again.');
  });

  it('calls the onLogin function with username and password', () => {
    const mockLogin = jest.fn();
    render(<Login onLogin={mockLogin} />);

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'user' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('login-button'));

    expect(mockLogin).toHaveBeenCalledWith('user', 'password');
  });
});