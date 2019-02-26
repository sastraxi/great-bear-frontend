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
};

/* ***************************** */

export const createOrderMutation = gql`
  mutation($amount: Int!, $stripeToken: String!, $latlon: geometry!) {
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
    order(id: $orderId) {
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
    order(id: $orderId) {
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

export const unpackOrder = (order: any): Order => {
  return {
    id: order.id,
    items: order.items,
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

export const orderSubscriptionUntransform = (data: any) => data.order;

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
  data.ordersList.map(unpackOrder);

const idCompareDescending = (a: any, b:any) => b.id - a.id;

// sort the list descending so we get the same ordering as query
export const ordersSubscriptionUntransform = (data: any) => ({
  ordersList: data.orders.orders.sort(idCompareDescending),
});

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
