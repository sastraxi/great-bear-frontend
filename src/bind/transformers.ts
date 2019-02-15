import moment from 'moment';
import { Order } from '../util/types';

const toMoment = (value?: string): moment.Moment | null => {
  if (!value) return null;
  return moment(value);
};

export const unpackOrder = (order: any): Order => {
  const { orderItemsByorderId: items } = order;
  return {
    items: items.map(({ quantity, itemByitemId }: any) => ({
      quantity,
      item: itemByitemId,
    })),
    amount: order.amount,
    latlon: {
      lat: order.latlon[0],
      lon: order.latlon[1],
    },

    error: order.error ? JSON.parse(order.error) : null,
    failedAt: toMoment(order.failed_at),

    createdAt: moment(order.created_at),
    authorizedAt: toMoment(order.authorized_at),
    verifiedAt: toMoment(order.verified_at),
    capturedAt: toMoment(order.captured_at),
    cookedAt: toMoment(order.cooked_at),
    deliveredAt: toMoment(order.delivered_at),
  };
};
