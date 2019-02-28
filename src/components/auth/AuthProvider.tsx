import React, { useEffect, useState } from 'react';
import { User } from '../../util/types';
import { defaultState, Provider } from './context';

interface Props {
  children: JSX.Element[] | JSX.Element | string,
  fetchUser(): Promise<User>,
}

/**
 * Adapted from https://github.com/hasura/react-check-auth
 * to work with authentication via GraphQL (and use hooks)!
 */
const AuthProvider = ({ fetchUser, children }: Props) => {
  const [loading, setLoading] = useState(defaultState.loading);
  const [user, setUser] = useState(defaultState.user);
  const [error, setError] = useState(defaultState.error);

  const refreshAuth = () => {
    setLoading(true);
    return fetchUser().then(
      (user) => {
        setUser(user);
        setError(null);
        setLoading(false);
        return user;
      },
      (err) => {
        console.error("AuthProvider", err);
        setUser(null);
        setError(err);
        setLoading(false);
        // TODO: should we re-throw?
      },
    );
  };

  useEffect(() => {
    refreshAuth(); // throw away promise
  }, []);

  const providedValue = {
    loading,
    user,
    error,
    refreshAuth,
    setUser,
  };

  return (
    <Provider value={providedValue}>
      { children }
    </Provider>
  );
};

export default AuthProvider;