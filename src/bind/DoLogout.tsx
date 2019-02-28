import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { FetchResult } from 'apollo-link';

export interface RenderProps {
  logout(): FetchResult<void>,
  loading: boolean,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const signupMutation = gql`
  mutation {
    logout {
      clientMutationId
    }
  }
`;

export default ({ children: renderChild }: Props) => (
  <Mutation mutation={signupMutation}>
    {
      (mutate, { loading }) => {
        return renderChild({
          logout: mutate,
          loading,
        });
      }
    }
  </Mutation>
);
