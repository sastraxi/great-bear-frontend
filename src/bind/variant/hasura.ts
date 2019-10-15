import gql from 'graphql-tag';
import { Cart, Order, LatLon } from '../../util/types';
import toMoment from '../../util/to-moment';
import toGeometry from '../../util/to-geometry';

export const packLatLon = (coord: LatLon) => toGeometry(coord);

export const itemsQuery = gql`
  query {
    item {
      id
      name
      amount
      category
      description
      image_url
    }
  }
`;

export const unpackItem = ({ image_url, ...item }: any) =>
    ({ ...item, imageUrl: image_url });

export const unpackItems = (data: any) => {
  return data.item.map(unpackItem);
};

export const generateCartQuery = (type: 'query' | 'subscription') => gql`
  ${type} {
    cart {
      id
      cartItems {
        quantity
        item {
          id
          amount
          name
          description
          image_url
        }
      }
    }
  } 
`;

export const unpackCart = (data: any): Cart | null => {
  if (!data.cart) return null;
  const cart = data.cart[0] || { id: undefined, cartItems: [] };
  const { cartItems, id } = cart;
  return {
    id,
    items: cartItems.map(({ quantity, item }: any) => ({
      quantity,
      item: unpackItem(item),
    })),
  };
};

export const cartSubscriptionMerge = (prev: any, data: any) => data || prev;
export const ordersSubscriptionMerge = (prev: any, data: any) => data || prev;
export const orderSubscriptionMerge = (prev: any, data: any) => data || prev;

export const createOrderMutation = gql`
  mutation($cartId: Int!, $amount: Int!, $stripeToken: String!, $latlon: geometry!) {
    insert_order(objects: [
      {
        cart_id: $cartId,
        amount: $amount,
        stripe_token: $stripeToken,
        destination_latlon: $latlon
      }
    ]) {
      returning {
        id
      }
    }
  }
`;

export const unpackOrderId = (data: any) =>
  data.insert_order.returning[0].id;

export const generateOrdersQuery = (type: 'query' | 'subscription') => gql`
  ${type} {
    order(order_by: { id: desc }) {
      id
      amount
      current_latlon
      destination_latlon

      error
      failed_at

      created_at
      authorized_at
      verified_at
      captured_at
      cooked_at
      delivered_at

      orderItems {
        quantity
        item {
          id
          amount
          name
          description
          image_url
        }   
      }
    }
  } 
`;

export const generateOrderQuery = (type: 'query' | 'subscription') => gql`
  ${type}($orderId: Int!) {
    order(where: { id: { _eq: $orderId }}) {
      id
      amount
      current_latlon
      destination_latlon

      error
      failed_at

      created_at
      authorized_at
      verified_at
      captured_at
      cooked_at
      delivered_at

      orderItems {
        quantity
        item {
          id
          amount
          name
          description
          image_url
        }   
      }
    }
  } 
`;

export const unpackOrder = (data: any): Order | null => {
  if (!data.order[0]) return null;
  const order = data.order[0];
  console.log('order', order);
  const { orderItems } = order;
  const ret = {
    id: order.id,
    items: orderItems.map(({ quantity, item }: any) => ({
      quantity,
      item: unpackItem(item),
    })),
    amount: order.amount,

    current: order.current_latlon && {
      lat: order.current_latlon.coordinates[0],
      lon: order.current_latlon.coordinates[1],
    },
    destination: order.destination_latlon && {
      lat: order.destination_latlon.coordinates[0],
      lon: order.destination_latlon.coordinates[1],
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
  console.log('returning...', ret);
  return ret;
};

export const unpackOrders = (data: any) => {
  const { order: orders } = data;
  return orders.map((order: any) => unpackOrder({ order: [order] }));
};
