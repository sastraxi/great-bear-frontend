import React, { Component, useState } from 'react';
import {
  injectStripe,
  CardElement,
  ReactStripeElements,
} from 'react-stripe-elements';
import LatLonInput from './LatLonInput';

const DEFAULT_DELIVERY_LOCATION = {
  lat: 43.761539,
  lon: -79.411079,
};

const CheckoutForm = (props: ReactStripeElements.InjectedStripeProps) => {
  const [center, setCenter] = useState(DEFAULT_DELIVERY_LOCATION);

  const handleSubmit = (ev: React.FormEvent) => {
    const { stripe } = props;
    ev.preventDefault();

    // the following automatically finds our CardElement
    stripe!.createToken().then(({token}) => {
      console.log('Received Stripe token:', token);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
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
