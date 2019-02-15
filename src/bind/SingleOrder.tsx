import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Order } from '../util/types';

import { unpackOrder } from './transformers';
import { ApolloError } from 'apollo-client';

export interface RenderProps {
  loading: boolean,
  error?: ApolloError,
  order?: Order,
  subscribe?(): void,
}

interface Props {
  orderId: number,
  children(props: RenderProps): JSX.Element,
}

const generateOrderQuery = (type: 'query' | 'subscription') => gql`
  ${type}($orderId: Int!) {
    order(where: { id: { _eq: $orderId }}) {
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

const ORDER_QUERY = generateOrderQuery('query');
const ORDER_SUBSCRIPTION = generateOrderQuery('subscription');

export default ({ orderId, children: renderChild }: Props) => (
  <Query query={ORDER_QUERY} variables={{ orderId }}>
    {
      ({ subscribeToMore, loading, data, error }) => {
        console.log(loading, data, error);
        if (loading) return renderChild({ loading });
        if (error) return renderChild({ loading: false, error });

        const order = data.order[0] ? unpackOrder(data.order[0]) : undefined;

        return renderChild({
          loading: false,
          order,
          subscribe: () =>
            subscribeToMore({
              document: ORDER_SUBSCRIPTION,
              variables: { orderId },
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
