import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '@shadcn/ui';

interface LoginProps {
  onLogin: (username: string, password: string) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLogin(username, password);
      setError(''); // Reset error message on successful login
    } catch (err) {
      // Display a generic error message to the user to avoid exposing sensitive information
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="username-input"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
        />
        {error && <div className="text-red-500" data-testid="login-error">{error}</div>}
        <Button type="submit" data-testid="login-button">Log In</Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;