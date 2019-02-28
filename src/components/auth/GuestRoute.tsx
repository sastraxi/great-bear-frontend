import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import authContext from './context';

/**
 * Makes a route only available when no user is logged in.
 */
const GuestRoute = (props: RouteProps) => {
  const { loading, user } = useContext(authContext);
  const { children, render, component, ...restRouteProps } = props;

  if (loading) return (
    <Route {...restRouteProps}>
      <div>Loading...</div>
    </Route>
  );

  if (user) return (
    <Route {...restRouteProps}>
      <Redirect to="/" />
    </Route>
  );

  return <Route {...props}/>;
};

export default GuestRoute;
