import { Moment } from 'moment';

export interface LatLon {
  lat: number,
  lon: number,
}

export interface Item {
  id: number,
  amount: number,
  name: string,
  description?: string,
  imageUrl?: string,
}

export interface CartItem {
  quantity: number,
  item: Item,
}

export interface OrderItem extends CartItem { }

export interface Order {
  items: [OrderItem],
  amount: number,
  latlon: LatLon,

  error?: Object,
  failedAt: Moment | null,

  createdAt: Moment,
  authorizedAt: Moment | null,
  verifiedAt: Moment | null,
  capturedAt: Moment | null,
  cookedAt: Moment | null,
  deliveredAt: Moment | null
};

export interface Geometry {
  type: 'Point',
  coordinates: [number, number],
  crs: {
    type: 'name',
    properties: {
      name: string,
    },
  },
}
