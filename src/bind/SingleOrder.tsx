import { ApolloError } from 'apollo-client';
import React from 'react';
import { Query } from 'react-apollo';
import { Order } from '../util/types';
import currentVariant from './variant';

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

const {
  generateOrderQuery,
  unpackOrder,
  orderSubscriptionUntransform,
} = currentVariant;

const ORDER_QUERY = generateOrderQuery('query');
const ORDER_SUBSCRIPTION = generateOrderQuery('subscription');

export default ({ orderId, children: renderChild }: Props) => (
  <Query query={ORDER_QUERY} variables={{ orderId }}>
    {
      ({ subscribeToMore, loading, data, error }) => {
        if (loading) return renderChild({ loading });
        if (error) return renderChild({ loading: false, error });

        const order = unpackOrder(data);

        return renderChild({
          loading: false,
          order: order || undefined,
          subscribe: () =>
            subscribeToMore({
              document: ORDER_SUBSCRIPTION,
              variables: { orderId },
              updateQuery: (prev, { subscriptionData }) => {
                return subscriptionData.data
                  ? orderSubscriptionUntransform(subscriptionData.data)
                  : prev;
              },
            }),
        });
      }
    }
  </Query>
);
