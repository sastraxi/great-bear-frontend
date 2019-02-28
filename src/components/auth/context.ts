import React from 'react';
import { User } from '../../util/types';

interface ContextValue {
  loading: boolean
  user: User | null
  error: any | null
  refreshAuth(): Promise<any>
  setUser(user: User | null): void
}

const NO_AUTH_HANDLER = 
  'No auth handler has been set up yet. Are you in an <AuthProvider />?';

export const defaultState: ContextValue = {
  loading: true,
  user: null,
  error: null,
  refreshAuth: () => Promise.reject(NO_AUTH_HANDLER),
  setUser: (user: User) => Promise.reject(NO_AUTH_HANDLER),
};

const authContext = React.createContext<ContextValue>(defaultState);
const { Provider, Consumer } = authContext;

export { Provider, Consumer };
export default authContext;
