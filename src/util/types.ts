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

export interface WithMessage {
  message?: string,
}

export interface Order {
  id: number,
  items: [OrderItem],
  amount: number,
  latlon: LatLon,

  error?: WithMessage,
  failedAt?: Moment,

  createdAt: Moment,
  authorizedAt?: Moment,
  verifiedAt?: Moment,
  capturedAt?: Moment,
  cookedAt?: Moment,
  deliveredAt?: Moment,
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
