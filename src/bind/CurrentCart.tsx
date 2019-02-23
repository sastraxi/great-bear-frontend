import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { CartItem } from '../util/types';
import { ApolloError } from 'apollo-client';

export interface RenderProps {
  loading: boolean,
  error?: ApolloError,
  items?: [CartItem],
  totalQuantity?: number,
  cartId?: number,
  subscribe?(): void,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const generateCartQuery = (type: 'query' | 'subscription') => gql`
  ${type} {
    current_cart {
      id
      cartItemsByCartId {
        quantity
        itemByitemId {
          id
          amount
          name
          description
        }
      }
    }
  } 
`;

const unpackCart = (cart: any): [CartItem]=> {
  const { cartItemsByCartId: items } = cart;
  return items.map(({ quantity, itemByitemId }: any) => ({
    quantity,
    item: itemByitemId,
  }));
}

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
        const cart = data.current_cart[0];
        const cartId = cart ? cart.id : undefined;
        const items = cart ? unpackCart(cart) : undefined;
        const totalQuantity = items
          ? items.map(i => i.quantity).reduce((a, b) => a + b, 0)
          : 0;

        return renderChild({
          loading: false,
          items,
          cartId,
          totalQuantity,
          subscribe: () =>
            subscribeToMore({
              document: CART_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                // our subscription has the same shape as our query
                console.log(subscriptionData);
                return subscriptionData.data || prev;
              },
            }),
        });
      }
    }
  </Query>
);
