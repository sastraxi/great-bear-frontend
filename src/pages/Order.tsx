import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Divider from '../view/Divider';
import Item from '../view/Item';
import SingleOrder from '../bind/SingleOrder';

interface Props {
  orderId: number,
}

const Order = ({ orderId }: Props) => (
  <SingleOrder orderId={orderId}>
    {
      ({ order, subscribe, loading }) => {
        useEffect(() => {
          if (subscribe) subscribe();
        }, [subscribe]);

        if (loading && !order) {
          return <span>Loading...</span>;
        }

        const { items, ...restOrder } = order!;

        return (
          <>
            <Header />
            <Divider />
            <pre>
              { JSON.stringify(restOrder, null, 2) }
            </pre>
            <Divider />
            {
              items && items.map(({ item, quantity }) => (
                <Item
                  key={item.id}
                  price={item.amount}
                  name={item.name}
                  description={item.description}
                  quantity={quantity}
                />
              ))
            }
          </>
        );
      }
    }
  </SingleOrder>
);

export default Order;
