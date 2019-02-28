import * as postgraphile from './postgraphile';
import * as hasura from './hasura';
import { Cart, Order, Item, LatLon } from '../../util/types';

/**
 * pack*: serialize data
 * unpack*: deserialize data
 * *subscriptionMerge:
 *    merge data from the subscription into previous results
 *    by the query.
 */
interface Variant {
  packLatLon: (coord: LatLon) => any

  generateCartQuery: (type: 'query' | 'subscription') => any
  unpackCart: (data: any) => Cart | null
  cartSubscriptionMerge: (prev: any, data: any) => any

  createOrderMutation: any,
  unpackOrderId: (data: any) => number

  generateOrderQuery: (type: 'query' | 'subscription') => any
  unpackOrder: (data: any) => Order | null
  orderSubscriptionMerge: (prev: any, data: any) => any

  generateOrdersQuery: (type: 'query' | 'subscription') => any
  unpackOrders: (data: any) => Order[] | null
  ordersSubscriptionMerge: (prev: any, data: any) => any

  itemsQuery: any
  unpackItems: (data: any) => Item[] | null
}

type VariantMap = {[key: string]: Variant};

const variants: VariantMap = {
  postgraphile,
  hasura,
};

export default variants[process.env.REACT_APP_VARIANT!];
