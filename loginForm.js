import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); 

  const navigate = useNavigate();

  const handlingLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    setLoggedIn(true); 

    navigate("/home");

  };

  const handlingReset = (e) => {
    e.preventDefault();
    console.log('Reset link sent to:', resetEmail);
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotPassword(false);
    }, 2000);
  };

  return (
    <div>
        {/* top navbar */}
      <div>
        <h3 style={{ display: 'inline-block' }}>Login Page</h3>
       {/*loggedIn && (
          <button
            style={{ float: 'right' }}
            onClick={() => navigate("/home")}
          >
            Home
          </button>
        )*/}
      </div>

      <hr />

      {/* login form */}
      <div>
        {showForgotPassword ? (
          <div>
            <form onSubmit={handlingReset}>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button type="submit">Send Reset Link</button>
            </form>
            <p onClick={() => setShowForgotPassword(false)}>
              ← Back to Login
            </p>
            {resetSent && (
              <p>
                Reset link sent to {resetEmail}
              </p>
            )}
          </div>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handlingLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p onClick={() => setShowForgotPassword(true)}>
                Forgot Password?
              </p>
              <button type="submit">Login</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;


