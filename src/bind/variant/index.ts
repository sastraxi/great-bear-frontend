import * as postgraphile from './postgraphile';
import * as hasura from './hasura';
import { Cart, Order, Item } from '../../util/types';

interface Variant {
  generateCartQuery: (type: 'query' | 'subscription') => any
  unpackCart: (data: any) => Cart | null
  cartSubscriptionUntransform: (data: any) => any

  createOrderMutation: any,
  unpackOrderId: (data: any) => number

  generateOrderQuery: (type: 'query' | 'subscription') => any
  unpackOrder: (data: any) => Order | null
  orderSubscriptionUntransform: (data: any) => any

  generateOrdersQuery: (type: 'query' | 'subscription') => any
  unpackOrders: (data: any) => Order[] | null
  ordersSubscriptionUntransform: (data: any) => any

  itemsQuery: any
  unpackItems: (data: any) => Item[] | null
}

type VariantMap = {[key: string]: Variant};

const variants: VariantMap = {
  postgraphile,
  hasura,
};

export default variants[process.env.REACT_APP_VARIANT!];
