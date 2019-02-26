import gql from 'graphql-tag';
import { Cart, Order } from '../../util/types';
import toMoment from '../../util/to-moment';

const currentCartSubscription = gql`
  subscription {
    currentCart {
      cart {
        id
        cartItemsList {
          quantity
          item {
            id
            amount
            name
            description
          }
        }
      }
    }
  }
`;

const currentCartQuery = gql`
  query {
    currentCart {
      id
      cartItemsList {
        quantity
        item {
          id
          amount
          name
          description
        }
      }
    }
  }
`;

export const generateCartQuery = (type: 'query' | 'subscription') =>
  (type === 'query' ? currentCartQuery : currentCartSubscription);

export const unpackCart = (data: any): Cart | null => {
  if (!data.currentCart) return null;
  const { cartItemsList: items, id } = data.currentCart;
  return {
    id,
    items,
  };
};

export const cartSubscriptionUntransform = (data: any) => {
  console.log(data);
  return {
    currentCart: data.currentCart.cart,
  }
}

// TODO: change this!
export const unpackOrder = (order: any): Order => {
  return {
    id: order.id,
    items: order.items,
    amount: order.amount,
    latlon: {
      lat: order.latlon.coordinates[0],
      lon: order.latlon.coordinates[1],
    },

    error: order.error,
    failedAt: toMoment(order.failedAt),

    createdAt: toMoment(order.createdAt)!,
    authorizedAt: toMoment(order.authorizedAt),
    verifiedAt: toMoment(order.verifiedAt),
    capturedAt: toMoment(order.capturedAt),
    cookedAt: toMoment(order.cookedAt),
    deliveredAt: toMoment(order.deliveredAt),
  };
};

export const itemsQuery = gql`
  query {
    itemsList {
      id
      name
      amount
      category
      description
      imageUrl
    }
  }
`;

export const unpackItems = (data: any) => data.itemsList;
