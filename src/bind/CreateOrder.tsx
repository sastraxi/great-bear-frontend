import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { LatLon } from '../util/types';

export interface RenderProps {
  createOrder(
    cartId: number,
    amount: number,
    stripeToken: string,
    latlon: LatLon,
  ): PromiseLike<any>,
  loading: boolean,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const createOrderMutation = gql`
  mutation($cartId: Int!, $amount: Int!, stripeToken: String!, $latlon: geometry!) {
    insert_order(objects: [
      {
        cart_id: $cartId,
        amount: $amount,
        stripe_token: $stripeToken,
        latlon: $latlon
      }
    ]) {
      returning {
        id
      }
    }
  }
`;

export default ({ children: renderChild }: Props) => (
  <Mutation mutation={createOrderMutation}>
    {
      (mutate, { loading }) => {
        return renderChild({
          createOrder: (cartId, amount, stripeToken, latlon) =>
            mutate({ variables: {
              cartId,
              amount,
              stripeToken,
              latlon: [latlon.lat, latlon.lon],
            }}).then((...args) => {
              console.log('createOrder mutation returned', args);
              return args;
            }),
          loading,
        });
      }
    }
  </Mutation>
);
