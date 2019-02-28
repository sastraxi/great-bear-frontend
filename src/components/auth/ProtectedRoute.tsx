import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import authContext from './context';

/**
 * Makes a route only available when a user is logged in.
 * FIXME: feels like there's a better way to write this & GuestRoute...
 */
const ProtectedRoute = (props: RouteProps) => {
  const { loading, user } = useContext(authContext);
  const { children, render, component, ...restRouteProps } = props;

  if (loading) return (
    <Route {...restRouteProps}>
      <div>Loading...</div>
    </Route>
  );

  if (!user) return (
    <Route {...restRouteProps}>
      <Redirect to="/login" />
    </Route>
  );

  return <Route {...props}/>;
};

export default ProtectedRoute;
