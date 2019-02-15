import React, { useState } from 'react';
import {
  injectStripe,
  CardElement,
  ReactStripeElements,
} from 'react-stripe-elements';
import { Redirect } from 'react-router';

import CreateOrder, { CreateOrderType } from '../bind/CreateOrder';
import LatLonInput from './LatLonInput';
import { formatCurrency } from '../util/currency';
import { LatLon } from '../util/types';

const DEFAULT_DELIVERY_LOCATION = {
  lat: 43.761539,
  lon: -79.411079,
};

interface Props extends ReactStripeElements.InjectedStripeProps {
  cartId: number,
  totalAmount: number,
}

const CheckoutForm = (props: Props) => {
  const [center, setCenter] = useState<LatLon>(DEFAULT_DELIVERY_LOCATION);
  const [orderId, setOrderId] = useState<number | null>(null);

  const handleSubmit = (createOrder: CreateOrderType) => async (ev: React.FormEvent) => {
    const { stripe, cartId, totalAmount } = props;
    ev.preventDefault();

    // the following automatically finds our CardElement
    const { token } = await stripe!.createToken();
    if (!token) return; // card did not go through

    try {
      console.log(cartId, totalAmount, token!.id, center);
      const orderId = await createOrder(
        cartId,
        totalAmount,
        token!.id,
        center,
      );
      setOrderId(orderId);
    } catch (err) {
      console.error('could not create order', err);
    }
  };

  if (orderId) {
    return <Redirect to={`/order/${orderId}`} />;
  }

  return (
    <CreateOrder>
      {
        ({ createOrder, loading }) => (
          <form onSubmit={handleSubmit(createOrder)}>
            <span>
              Order total: {formatCurrency(props.totalAmount)}
            </span>
            <CardElement style={{base: {fontSize: '18px'}}} />
            { center.lat } x { center.lon }
            <LatLonInput
              value={center}
              defaultZoom={13}
              onChange={setCenter}
              showMapButton={false}
            />
            <button disabled={loading}>
              Place order
            </button>
          </form>  
        )
      }
    </CreateOrder>
  );
};

export default injectStripe(CheckoutForm);
