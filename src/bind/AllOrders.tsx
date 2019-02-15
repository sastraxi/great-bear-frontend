import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Order } from '../util/types';

import { unpackOrder } from './transformers';
import { ApolloError } from 'apollo-client';

export interface RenderProps {
  loading: boolean,
  error?: ApolloError,
  orders?: [Order],
  subscribe?(): void,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const generateOrdersQuery = (type: 'query' | 'subscription') => gql`
  ${type} {
    order(order_by: { id: desc }) {
      id
      amount
      latlon

      error
      failed_at

      created_at
      authorized_at
      verified_at
      captured_at
      cooked_at
      delivered_at

      orderItemsByorderId {
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

const ORDERS_QUERY = generateOrdersQuery('query');
const ORDERS_SUBSCRIPTION = generateOrdersQuery('subscription');

export default ({
  children: renderChild,
}: Props) => (
  <Query query={ORDERS_QUERY}>
    {
      ({ subscribeToMore, loading, data, error }) => {
        if (loading) return renderChild({ loading });
        if (error) return renderChild({ loading: false, error });

        const orders = data.order ? data.order.map(unpackOrder) : undefined;

        return renderChild({
          loading: false,
          orders,
          subscribe: () =>
            subscribeToMore({
              document: ORDERS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                // our subscription has the same shape as our query
                return subscriptionData.data || prev;
              },
            }),
        });
      }
    }
  </Query>
);
