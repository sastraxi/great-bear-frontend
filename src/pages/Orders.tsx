import React, { useEffect } from 'react';
import AllOrders from '../bind/AllOrders';
import Header from '../components/Header';
import Divider from '../view/Divider';
import OrderGrid from '../view/OrderGrid';
import Heading from '../view/Heading';
import { Order } from '../util/types';

interface Props {
  orders: [Order],
  subscribe(): void,
}

const OrdersView = ({ orders, subscribe }: Props) => {
  useEffect(() => {    
    if (subscribe) subscribe();
  }, [subscribe]);

  return (
    <>
      <Header />
      <Divider />
      <Heading>My Orders</Heading>
      { orders && <OrderGrid orders={orders!} /> }
      { !orders && "No orders." }
    </>
  )
};

const Orders = ({ }) => (
  <AllOrders>
    {
      ({ loading, error, orders, subscribe }) => {
        if (loading) {
          return <span>Loading...</span>;
        }

        return (<OrdersView orders={orders!} subscribe={subscribe!} />);
      }
    }
  </AllOrders>
);

export default Orders;
