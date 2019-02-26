import { History } from "history";
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import CreateOrder, { CreateOrderType } from '../bind/CreateOrder';
import { formatCurrency } from '../util/currency';
import { LatLon } from '../util/types';
import LatLonInput from './LatLonInput';

const DEFAULT_DELIVERY_LOCATION = {
  lat: 43.761539,
  lon: -79.411079,
};

interface Props extends
  ReactStripeElements.InjectedStripeProps,
  RouteComponentProps
{
  cartId: number
  totalAmount: number
  history: History
}

const CheckoutForm = (props: Props) => {
  const [center, setCenter] = useState<LatLon>(DEFAULT_DELIVERY_LOCATION);

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
      console.log('order id', orderId);
      props.history.push(`/orders/${orderId}`);
    } catch (err) {
      console.error('could not create order', err);
    }
  };

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
            <button disabled={loading || !props.totalAmount || !props.cartId}>
              Place order
            </button>
          </form>  
        )
      }
    </CreateOrder>
  );
};

export default injectStripe(withRouter(CheckoutForm));
