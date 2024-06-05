import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { darkMode } = useOutletContext;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="login-form-container">
      <form
        className={"login-form"}
        onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>
        <button type="submit">Login</button>
        <div className="form-links">
          <Link tp="/login">Forgot Password?</Link>
          <Link to="/signup">Create an Account</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
