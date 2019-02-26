import * as postgraphile from './postgraphile';
import * as hasura from './hasura';
import { Cart, Order, Item } from '../../util/types';

interface Variant {
  generateCartQuery: (type: 'query' | 'subscription') => any
  unpackCart: (data: any) => Cart | null
  cartSubscriptionUntransform: (data: any) => any

  unpackOrder: (data: any) => Order | null

  itemsQuery: any
  unpackItems: (data: any) => Item[] | null
}

type VariantMap = {[key: string]: Variant};

const variants: VariantMap = {
  postgraphile,
  hasura,
};

export default variants[process.env.REACT_APP_VARIANT!];
