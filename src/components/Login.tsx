import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

type LoginProps = {
  onLoginSuccess: (decodedToken: any) => void;
};

type FormState = {
  username: string;
  password: string;
};

type ErrorState = {
  username?: string;
  password?: string;
  form?: string;
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [formState, setFormState] = useState<FormState>({ username: '', password: '' });
  const [errors, setErrors] = useState<ErrorState>({});

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};
    if (!formState.username) newErrors.username = 'Username is required';
    if (!formState.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      if (!response.ok) throw new Error('Login failed');

      const { token } = await response.json();
      const decodedToken = jwtDecode(token);
      onLoginSuccess(decodedToken);
    } catch (error: any) {
      setErrors({ form: error.message });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input name="username" value={formState.username} onChange={handleChange} />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formState.password} onChange={handleChange} />
        {errors.password && <span>{errors.password}</span>}
      </div>
      {errors.form && <div>{errors.form}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;