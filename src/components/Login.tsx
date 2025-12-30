// Import necessary dependencies
import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

// Define TypeScript interfaces for props and state
interface LoginProps {}

interface LoginState {
  username: string;
  password: string;
  error: string | null;
}

// Login component
const Login: React.FC<LoginProps> = () => {
  // State management
  const [state, setState] = useState<LoginState>({
    username: '',
    password: '',
    error: null
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate API request
      const response = await fakeApiLogin(state.username, state.password);
      const decodedToken = jwtDecode(response.token);
      console.log('User decoded:', decodedToken);
      setState({ ...state, error: null });
    } catch (error) {
      setState({ ...state, error: 'An error occurred. Please try again later.' });
    }
  };

  // Simulated API login function
  const fakeApiLogin = (username: string, password: string) => {
    return new Promise<{ token: string }>((resolve, reject) => {
      if (username === 'user' && password === 'password') {
        resolve({ token: 'fake-jwt-token' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </div>
  );
};

export default Login;
