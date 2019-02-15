import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export interface RenderProps {
  setCartQuantity(itemId: number, quantity: number): void,
  loading: boolean,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const setCartQuantityMutation = gql`
  mutation($itemId: Int!, $quantity: Int!) {
    setCartQuantity(itemId: $itemId, quantity: $quantity)
  }
`;

export default ({ children: renderChild }: Props) => (
  <Mutation mutation={setCartQuantityMutation}>
    {
      (mutate, { loading }) => {
        return renderChild({
          setCartQuantity: (itemId, quantity) =>
            mutate({ variables: { itemId, quantity }}),
          loading,
        });
      }
    }
  </Mutation>
);
