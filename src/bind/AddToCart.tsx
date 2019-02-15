import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export interface RenderProps {
  addToCart(itemId: number, quantity: number): void,
  loading: boolean,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const addToCartMutation = gql`
  mutation($itemId: Int!, $quantity: Int!) {
    addToCart(itemId: $itemId, quantity: $quantity)
  }
`;

export default ({ children: renderChild }: Props) => (
  <Mutation mutation={addToCartMutation}>
    {
      (mutate, { loading }) => {
        return renderChild({
          addToCart: (itemId, quantity) =>
            mutate({ variables: { itemId, quantity }}),
          loading,
        });
      }
    }
  </Mutation>
);
