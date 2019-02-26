import React from 'react';
import { Mutation } from 'react-apollo';
import toGeometry from '../util/to-geometry';
import { LatLon } from '../util/types';
import currentVariant from './variant';

export type CreateOrderType = ((
  cartId: number,
  amount: number,
  stripeToken: string,
  latlon: LatLon,
) => PromiseLike<number>);

export interface RenderProps {
  createOrder: CreateOrderType,
  loading: boolean,
}

interface Props {
  children(props: RenderProps): JSX.Element,
}

const {
  createOrderMutation,
  unpackOrderId,
  packLatLon,
} = currentVariant;

export default ({ children: renderChild }: Props) => (
  <Mutation mutation={createOrderMutation}>
    {
      (mutate, { loading }) => {
        return renderChild({
          createOrder: (cartId, amount, stripeToken, latlon) =>
            mutate({ variables: {
              cartId,
              amount,
              stripeToken,
              latlon: packLatLon(latlon),
            }}).then(
              ({ data }: any) => {
                console.log('createOrder mutation returned', data);
                return unpackOrderId(data);
              },
              (err: any) => {
                console.error('createOrder threw error', err);
                throw err;
              }
            ),
          loading,
        });
      }
    }
  </Mutation>
);
