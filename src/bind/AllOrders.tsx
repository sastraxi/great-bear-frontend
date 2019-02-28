import { ApolloError } from 'apollo-client';
import React from 'react';
import { Query } from 'react-apollo';
import { Order } from '../util/types';
import currentVariant from './variant';

export interface RenderProps {
  loading: boolean,
  error?: ApolloError,
  orders?: Order[],
  subscribe?(): void,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const {
  generateOrdersQuery,
  unpackOrders,
  ordersSubscriptionMerge,
} = currentVariant;

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

        const orders = unpackOrders(data);

        return renderChild({
          loading: false,
          orders: orders || undefined,
          subscribe: () =>
            subscribeToMore({
              document: ORDERS_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) =>
                ordersSubscriptionMerge(
                  prev,
                  subscriptionData.data
                ),
            }),
        });
      }
    }
  </Query>
);
