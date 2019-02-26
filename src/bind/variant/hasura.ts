import gql from 'graphql-tag';
import { Cart, Order } from '../../util/types';
import toMoment from '../../util/to-moment';

export const generateCartQuery = (type: 'query' | 'subscription') => gql`
  ${type} {
    current_cart {
      id
      cartItemsByCartId {
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

export const unpackCart = (data: any): Cart | null => {
  if (!data.current_cart) return null;
  const cart = data.current_cart[0];
  const { cartItemsByCartId: items, id } = cart;
  return {
    id,
    items: items.map(({ quantity, itemByitemId }: any) => ({
      quantity,
      item: itemByitemId,
    })),
  };
};

export const cartSubscriptionUntransform = (data: any) => data;

export const unpackOrder = (order: any): Order => {
  const { orderItemsByorderId: items } = order;
  return {
    id: order.id,
    items: items.map(({ quantity, itemByitemId }: any) => ({
      quantity,
      item: itemByitemId,
    })),
    amount: order.amount,
    latlon: {
      lat: order.latlon.coordinates[0],
      lon: order.latlon.coordinates[1],
    },

    error: order.error,
    failedAt: toMoment(order.failed_at),

    createdAt: toMoment(order.created_at)!,
    authorizedAt: toMoment(order.authorized_at),
    verifiedAt: toMoment(order.verified_at),
    capturedAt: toMoment(order.captured_at),
    cookedAt: toMoment(order.cooked_at),
    deliveredAt: toMoment(order.delivered_at),
  };
};

export const itemsQuery = gql`
query {
  item {
    id
    name
    amount
    category
    description
    imageUrl
  }
}
`;

export const unpackItems = (data: any) => [];
