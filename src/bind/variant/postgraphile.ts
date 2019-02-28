import unionBy from 'lodash/unionBy';
import gql from 'graphql-tag';
import { Cart, Order, LatLon } from '../../util/types';
import toMoment from '../../util/to-moment';

export const packLatLon = (coord: LatLon) => coord;

/* ***************************** */

const currentCartSubscription = gql`
  subscription {
    currentCart {
      cart {
        id
        cartItemsList {
          quantity
          item {
            id
            name            
            amount
            category
            description
            imageUrl
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
          name            
          amount
          category
          description
          imageUrl
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

export const cartSubscriptionMerge = (prev: any, data: any) => {
  if (!data) return prev;
  return {
    currentCart: data.currentCart.cart,
  };
};

/* ***************************** */

export const createOrderMutation = gql`
  mutation($amount: Int!, $stripeToken: String!, $latlon: LatLon!) {
    checkout(
      deliveryLocation: $latlon,
      stripeToken: $stripeToken,
      amount: $amount
    )
  }
`;

export const unpackOrderId = (data: any) =>
  data.checkout;

/* ***************************** */

const orderQuery = gql`
  query($orderId: Int!) {
    orderById(id: $orderId) {
      id
      amount
      currentJson
      destinationJson
      
      error
      failedAt
      
      createdAt
      verifiedAt
      capturedAt
      cookedAt
      deliveredAt
      
      orderItemsList {
        quantity
        item {
          id
          name
          amount
          category
          description
          imageUrl
        }
      }
    }
  }
`;

const orderSubscription = gql`
  subscription($orderId: Int!) {
    orderById(id: $orderId) {
      order {
        id
        amount
        currentJson
        destinationJson

        error
        failedAt

        createdAt
        verifiedAt
        capturedAt
        cookedAt
        deliveredAt

        orderItemsList {
          quantity
          item {
            id
            name
            amount
            category
            description
            imageUrl
          }
        }
      }
    }
  }
`;

export const generateOrderQuery = (type: 'query' | 'subscription') =>
  (type === 'query' ? orderQuery : orderSubscription);

export const unpackOrder = (data: any): Order | null => {
  const { orderById: order } = data;
  if (!order) return null;
  return {
    id: order.id,
    items: order.orderItemsList,
    amount: order.amount,

    destination: order.destinationJson && {
      // FIXME: are these swapped??
      lat: order.destinationJson.coordinates[0],
      lon: order.destinationJson.coordinates[1],
    },
    current: order.currentJson && {
      lat: order.currentJson.coordinates[0],
      lon: order.currentJson.coordinates[1],
    },

    error: order.error,
    failedAt: toMoment(order.failedAt),

    createdAt: toMoment(order.createdAt)!,
    authorizedAt: toMoment(order.createdAt)!, // create + auth in one step
    verifiedAt: toMoment(order.verifiedAt),
    capturedAt: toMoment(order.capturedAt),
    cookedAt: toMoment(order.cookedAt),
    deliveredAt: toMoment(order.deliveredAt),
  };
};

export const orderSubscriptionMerge = (prev: any, data: any) => {
  if (!data) return prev;
  return {
    orderById: data.orderById.order,
  };
};

/* ***************************** */
  
const ordersQuery = gql`
  query {
    ordersList(orderBy: ID_DESC) {
      id
      amount

      failedAt
      createdAt
      verifiedAt
      capturedAt
      cookedAt
      deliveredAt
    }
  }
`;

const ordersSubscription = gql`
  subscription {
    orders {
      orders {
        id
        amount

        failedAt
        createdAt
        verifiedAt
        capturedAt
        cookedAt
        deliveredAt
      }
    }
  }
`;

export const generateOrdersQuery = (type: 'query' | 'subscription') =>
  (type === 'query' ? ordersQuery : ordersSubscription);

export const unpackOrders = (data: any) =>
  data.ordersList.map((order: any) => ({
    id: order.id,
    amount: order.amount,

    failedAt: toMoment(order.failedAt),
    createdAt: toMoment(order.createdAt)!,
    authorizedAt: toMoment(order.createdAt)!, // create + auth in one step
    verifiedAt: toMoment(order.verifiedAt),
    capturedAt: toMoment(order.capturedAt),
    cookedAt: toMoment(order.cookedAt),
    deliveredAt: toMoment(order.deliveredAt),
  }));

const idCompareDescending = (a: any, b:any) => b.id - a.id;

// sort the list descending so we get the same ordering as query
export const ordersSubscriptionMerge = (prev: any, data: any) => {
  if (!data) return prev;
  return {
    ordersList: unionBy(
      data.orders.orders,
      prev.ordersList,
      (order: any) => order.id,
    ).sort(idCompareDescending),
  };
};

/* ***************************** */

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
