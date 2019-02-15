import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Order } from '../util/types';

import { unpackOrder } from './transformers';

export interface RenderProps {
  loading: boolean,
  order?: Order,
  subscribe?(): void,
}

interface Props {
  orderId: number,
  children(props: RenderProps): JSX.Element,
}

const generateOrderQuery = (type: 'query' | 'subscription') => gql`
  ${type}($orderId: String!) {
    order(where: { id: { _eq: $orderId }}) {
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

const ORDER_QUERY = generateOrderQuery('query');
const ORDER_SUBSCRIPTION = generateOrderQuery('subscription');

export default ({
  orderId,
  children: renderChild,
}: Props) => (
  <Query query={ORDER_QUERY} variables={{ orderId }}>
    {
      ({ subscribeToMore, loading, data }) => {
        if (loading) return renderChild({ loading });

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
