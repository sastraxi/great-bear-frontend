import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Order } from '../util/types';
import moment from 'moment';

const toMoment = (value?: string): moment.Moment | null => {
  if (!value) return null;
  return moment(value);
};

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

const unpackOrder = (order: any): Order => {
  const { orderItemsByorderId: items } = order;
  return {
    items: items.map(({ quantity, itemByitemId }: any) => ({
      quantity,
      item: itemByitemId,
    })),
    amount: order.amount,
    latlon: {
      lat: order.latlon[0],
      lon: order.latlon[1],
    },

    error: order.error ? JSON.parse(order.error) : null,
    failedAt: toMoment(order.failed_at),

    createdAt: moment(order.created_at),
    authorizedAt: toMoment(order.authorized_at),
    verifiedAt: toMoment(order.verified_at),
    capturedAt: toMoment(order.captured_at),
    cookedAt: toMoment(order.cooked_at),
    deliveredAt: toMoment(order.delivered_at),
  };
};

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
