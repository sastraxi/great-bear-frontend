import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Order } from '../util/types';

import { unpackOrder } from './transformers';

export interface RenderProps {
  loading: boolean,
  orders?: [Order],
  subscribe?(): void,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const generateOrdersQuery = (type: 'query' | 'subscription') => gql`
  ${type}($orderId: String!) {
    order {
      id
      amount
      created_at
      error
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
      ({ subscribeToMore, loading, data }) => {
        if (loading) return renderChild({ loading });

        const orders = data.orders ? data.orders.map(unpackOrder) : undefined;

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
