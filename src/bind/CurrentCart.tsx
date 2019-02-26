import React from 'react';
import { Query } from 'react-apollo';
import { ApolloError } from 'apollo-client';

import { Cart } from '../util/types';
import currentVariant from './variant';

export interface RenderProps {
  loading: boolean,
  error?: ApolloError,
  cart?: Cart,
  totalQuantity?: number,
  subscribe?(): void,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const {
  generateCartQuery,
  unpackCart,
  cartSubscriptionUntransform,
} = currentVariant;

const CART_QUERY = generateCartQuery('query');
const CART_SUBSCRIPTION = generateCartQuery('subscription');

export default ({ children: renderChild }: Props) => (
  <Query query={CART_QUERY}>
    {
      ({ subscribeToMore, loading, data, error }) => {
        if (loading) return renderChild({ loading });
        if (error) return renderChild({ loading: false, error });

        // the cart gets created on the first insert, so
        // not having a cart can be treated as an empty cart.
        const cart = unpackCart(data);
        const totalQuantity = cart
          ? cart.items.map(i => i.quantity).reduce((a, b) => a + b, 0)
          : 0; 

        return renderChild({
          loading: false,
          cart: cart || undefined,
          totalQuantity,
          subscribe: () =>
            subscribeToMore({
              document: CART_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                return subscriptionData.data
                  ? cartSubscriptionUntransform(subscriptionData.data)
                  : prev;
              },
            }),
        });
      }
    }
  </Query>
);
