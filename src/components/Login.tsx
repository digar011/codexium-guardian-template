import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

// TypeScript type for JWT payload
interface JWTPayload {
  exp: number;
  iat: number;
  [key: string]: any;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      // Simulate an API call
      const response = await fakeApiLogin(username, password);
      const token = response.token;
      const decoded: JWTPayload = jwtDecode(token);

      // Check token expiration
      if (decoded.exp * 1000 < Date.now()) {
        setError('Token has expired.');
      } else {
        // Successfully logged in
        console.log('Login successful');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

// Mock API function to simulate login
async function fakeApiLogin(username: string, password: string) {
  return new Promise<{ token: string }>((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        resolve({ token: 'fake.jwt.token' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

export default Login;
