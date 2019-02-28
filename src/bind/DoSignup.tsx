import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { User } from '../util/types';
import { FetchResult } from 'apollo-link';

export interface RenderProps {
  signup(email: string, password: string): FetchResult<User>,
  loading: boolean,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const signupMutation = gql`
  mutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
      isAdmin
    }
  }
`;

export default ({ children: renderChild }: Props) => (
  <Mutation mutation={signupMutation}>
    {
      (mutate, { loading }) => {
        return renderChild({
          signup: (email, password) =>
            mutate({ variables: { email, password }}),
          loading,
        });
      }
    }
  </Mutation>
);
