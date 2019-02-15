import React, { Component, useState } from 'react';
import {
  injectStripe,
  CardElement,
  ReactStripeElements,
} from 'react-stripe-elements';

import LatLonInput from './LatLonInput';
import { formatCurrency } from '../util/currency';

const DEFAULT_DELIVERY_LOCATION = {
  lat: 43.761539,
  lon: -79.411079,
};

interface Props extends ReactStripeElements.InjectedStripeProps {
  cartId: number,
  totalAmount: number,
}

const CheckoutForm = (props: Props) => {
  const [center, setCenter] = useState(DEFAULT_DELIVERY_LOCATION);

  const handleSubmit = (ev: React.FormEvent) => {
    const { stripe, cartId, totalAmount } = props;
    ev.preventDefault();

    // the following automatically finds our CardElement
    stripe!.createToken().then(({ token }) => {
      console.log(cartId, totalAmount, token!.id, center);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button>Place order</button>
    </form>
  );
};

export default injectStripe(CheckoutForm);
