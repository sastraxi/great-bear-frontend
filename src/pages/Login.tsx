import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import DoLogin, { RenderProps } from '../bind/DoLogin';
import authContext from '../components/auth/context';
import AuthContainer from '../view/AuthContainer';
import Logo from '../view/Logo';
import Divider from '../view/Divider';

const LoginInner = ({ login, loading }: RenderProps) => {
  const { setUser } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submissionHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login(email, password);
    setUser(user);
  };

  return (
    <AuthContainer>
      <Logo centered />
      <Divider />
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
      <Divider />
      <Link to="/signup">New here? Signup now.</Link>
    </AuthContainer>
  );
};

const Login = () => (
  <DoLogin>
    { (props) => <LoginInner {...props} /> }
  </DoLogin>
);

export default Login;
