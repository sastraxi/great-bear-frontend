import React, { useState } from 'react';
import DoLogin, { RenderProps } from '../bind/DoLogin';
import Logo from '../view/Logo';

import { Link } from 'react-router-dom';

const LoginInner = ({ login, loading }: RenderProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const submissionHandler = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Logo />
      <form onSubmit={submissionHandler}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="submit"
          value="Login"
          disabled={!email || !password || loading}
        />
      </form>
      <Link to="/signup">New here?</Link>
    </>
  );
};

const Login = () => (
  <DoLogin>
    { (props) => <LoginInner {...props} /> }
  </DoLogin>
);

export default Login;
