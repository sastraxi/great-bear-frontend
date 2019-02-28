import React, { useState } from 'react';
import DoSignup, { RenderProps } from '../bind/DoSignup';
import Logo from '../view/Logo';

import { Link } from 'react-router-dom';

const SignupInner = ({ signup, loading }: RenderProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const submissionHandler = (e: React.FormEvent) => {
    e.preventDefault();
    signup(email, password);
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
          value="Signup"
          disabled={!email || !password || loading}
        />
      </form>
      <Link to="/login">Already have an account?</Link>
    </>
  );
};

const Signup = () => (
  <DoSignup>
    { (props) => <SignupInner {...props} /> }
  </DoSignup>
);

export default Signup;
