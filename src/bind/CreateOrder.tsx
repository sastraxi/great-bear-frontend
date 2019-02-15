import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { LatLon, Geometry } from '../util/types';

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

/**
 * Converts a lat/lon point to GeoJSON coordinate in the given coordinate system
 * See https://blog.hasura.io/graphql-and-geo-location-on-postgres-using-hasura-562e7bd47a2f/
 * and https://gis.stackexchange.com/a/60945 for how to set SRID with GeoJSON
 */
const toGeometry = ({ lat, lon }: LatLon, srid: number = 4326): Geometry => ({
  type: 'Point',
  coordinates: [lat, lon],
  crs: {
    type: 'name',
    properties: {
      name: `EPSG:${srid}`,
    },
  },
});

const createOrderMutation = gql`
  mutation($cartId: Int!, $amount: Int!, $stripeToken: String!, $latlon: geometry!) {
    insert_order(objects: [
      {
        cart_id: $cartId,
        amount: $amount,
        stripe_token: $stripeToken,
        latlon: $latlon
      }
    ]) {
      returning {
        id
      }
    }
  }
`;

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
              latlon: toGeometry(latlon),
            }}).then(({ data }: any) => {
              console.log('createOrder mutation returned', data);
              return data.insert_order.returning[0].id;
            }),
          loading,
        });
      }
    }
  </Mutation>
);
