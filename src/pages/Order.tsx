import React, { useEffect } from 'react';
import * as Types from '../util/types';
import SingleOrder from '../bind/SingleOrder';
import Header from '../components/Header';
import Divider from '../view/Divider';
import Item from '../view/Item';
import Status from '../view/Status';
import { formatCurrency } from '../util/currency';
import DebugView from '../view/DebugView';

interface OrderViewProps {
  order: Types.Order,
  subscribe?(): any,
}

const OrderView = ({ order, subscribe }: OrderViewProps) => {
  useEffect(() => {
    if (subscribe) subscribe();
  }, [subscribe]);

  const { items, ...restOrder } = order;

  const happyStatus = () => (
    <>
      <Status label="Charge authorized" value={order.authorizedAt} loading={!!order.createdAt} />
      <Status label="Order validated" value={order.verifiedAt} loading={!!order.authorizedAt} />
      <Status label="Payment received" value={order.capturedAt} loading={!!order.verifiedAt} />
      <Status label="Cooking finished" value={order.cookedAt} loading={!!order.capturedAt} />
      <Status label="Order delivered" value={order.deliveredAt} loading={!!order.cookedAt} />
    </>
  );
  
  const failureStatus = () => (
    <>
      <Status label="Failed" value={order.failedAt} />
      <Status label="Error message" value={order.error && order.error.message} />
    </>
  );

  return (
    <>
      <Header />
      <Divider />

      <Status label="Order number" value={`#${order.id}`} />
      <Status label="Total amount" value={formatCurrency(order.amount)} />
      <Status label="Submitted" value={order.createdAt} />
      { order.failedAt ? failureStatus() : happyStatus() }

      <Divider />
      {
        items.map(({ item, quantity }) => (
          <Item
            key={item.id}
            amount={item.amount}
            name={item.name}
            description={item.description}
            quantity={quantity}
          />
        ))
      }
      <Divider />

      <DebugView value={restOrder} />
    </>
  );
};

interface Props {
  orderId: number,
}

const Order = ({ orderId }: Props) => (
  <SingleOrder orderId={orderId}>
    {
      ({ order, subscribe, loading }) => {
        if (loading && !order) {
          return <span>Loading...</span>;
        }

        return <OrderView order={order!} subscribe={subscribe} />;
      }
    }
  </SingleOrder>
);

export default Order;
