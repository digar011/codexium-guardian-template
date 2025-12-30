import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

interface LoginProps {}

interface User {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const [user, setUser] = useState<User>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Simulate API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { token } = await response.json();
      const decodedToken = jwtDecode(token);
      console.log('User authenticated:', decodedToken);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;