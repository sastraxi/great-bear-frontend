import React, { useContext } from 'react';
import DoLogout from '../../bind/DoLogout';
import authContext from './context';

interface Props {
  children: JSX.Element[] | JSX.Element | string,
};

const LogoutButton = (props: Props) => {
  const { setUser } = useContext(authContext);
  return (
    <DoLogout>
      {
        ({ logout, loading }) => (
          <button
            {...props}
            disabled={loading}
            onClick={(_event: React.MouseEvent) => {
              logout();
              setUser(null);
            }}
          />
        )
      }
    </DoLogout>
  )
};

export default LogoutButton;
