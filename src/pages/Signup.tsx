import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import DoSignup, { RenderProps } from '../bind/DoSignup';
import authContext from '../components/auth/context';
import Logo from '../view/Logo';

const SignupInner = ({ signup, loading }: RenderProps) => {
  const { setUser } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const submissionHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await signup(email, password);
    setUser(user);
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
