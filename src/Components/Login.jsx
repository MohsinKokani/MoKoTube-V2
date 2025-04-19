import React, { useState } from 'react';

const storedHash = '55bb35c6e8d3a3f87618f5276d62f179f5991ccae7450b433f6eff3904aa110f';

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const Login = ({ setIsLoggedIn }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const hash = await hashPassword(password);
    if (hash === storedHash) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            autoComplete="current-password"
          />
          <button type="submit" className="login-button small">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>

  );
};

export default Login;
