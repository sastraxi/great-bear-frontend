import React, { useContext } from 'react';
import DoLogout from '../../bind/DoLogout';
import authContext from './context';
import { withApollo, WithApolloClient } from 'react-apollo';

interface Props {
  children: JSX.Element[] | JSX.Element | string,
};

const LogoutButton = (props: WithApolloClient<Props>) => {
  const { client, ...buttonProps } = props;
  const { setUser } = useContext(authContext);
  return (
    <DoLogout>
      {
        ({ logout, loading }) => (
          <button
            {...buttonProps}
            disabled={loading}
            onClick={(_event: React.MouseEvent) => {
              logout();
              setUser(null);
              client.resetStore();
            }}
          />
        )
      }
    </DoLogout>
  )
};

export default withApollo(LogoutButton);
