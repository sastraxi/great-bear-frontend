import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { User } from '../util/types';

export interface RenderProps {
  login(email: string, password: string): Promise<User>,
  loading: boolean,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const signupMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default ({ children: renderChild }: Props) => (
  <Mutation mutation={signupMutation}>
    {
      (mutate, { loading }) => {
        return renderChild({
          login: (email, password) =>
            mutate({ variables: { email, password }})
              .then(({ data }: any) => data.login),
          loading,
        });
      }
    }
  </Mutation>
);
