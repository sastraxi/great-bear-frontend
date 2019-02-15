import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { CartItem } from '../util/types';

export interface RenderProps {
  loading: boolean,
  items?: [CartItem],
  totalQuantity?: number,
  cartId?: number,
  subscribe?(): void,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const SESSION_ID_QUERY = gql`
  query {
    sessionId
  }
`;

const generateCartQuery = (type: 'query' | 'subscription') => gql`
  ${type}($sessionId: String!) {
    cart(where: { session_id: { _eq: $sessionId }}) {
      id
      cartItemsBycartId {
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
  const { cartItemsBycartId: items } = cart;
  return items.map(({ quantity, itemByitemId }: any) => ({
    quantity,
    item: itemByitemId,
  }));
}

const CART_QUERY = generateCartQuery('query');
const CART_SUBSCRIPTION = generateCartQuery('subscription');

export default ({ children: renderChild }: Props) => (
  <Query query={SESSION_ID_QUERY}>
    {
      ({ loading, data }) => {
        if (loading) return renderChild({ loading });
        const { sessionId } = data;
        return (
          <Query query={CART_QUERY} variables={{ sessionId }}>
            {
              ({ subscribeToMore, loading, data }) => {
                if (loading) return renderChild({ loading });

                // the cart gets created on the first insert, so
                // not having a cart can be treated as an empty cart.
                const cart = data.cart[0];
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
                      variables: { sessionId },
                      updateQuery: (prev, { subscriptionData }) => {
                        // our subscription has the same shape as our query
                        return subscriptionData.data || prev;
                      },
                    }),
                });
              }
            }
          </Query>
        )
      }
    }
  </Query>
);
