import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

interface LoginProps {}

interface FormState {
  username: string;
  password: string;
  error: string | null;
}

const Login: React.FC<LoginProps> = () => {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    password: '',
    error: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formState.username,
          password: formState.password
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token } = await response.json();
      const decodedToken = jwtDecode<{ username: string }>(token);
      console.log('Logged in as:', decodedToken.username);
      setFormState({ ...formState, error: null });
    } catch (error: any) {
      setFormState({ ...formState, error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
          required
        />
      </div>
      {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;