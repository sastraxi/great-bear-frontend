import React from 'react';
import styled from 'styled-components';

import { Order } from '../util/types';
import Status from './Status';
import { Link } from 'react-router-dom';
import { IoMdTime } from 'react-icons/io';
import { formatCurrency } from '../util/currency';

const coalesce = (...args: any[]) => {
  return args.filter(x => x)[0];
};

interface Props {
  orders: [Order],
}

const Layout = styled.div`
  display: grid;
  margin: auto;
  grid-template-columns: repeat(auto-fit, 233px);
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 10px;
  justify-content: center;
`;

const Card = styled.div`
  padding: 20px;
  padding-top: 0; /* big number aligns better visually */

  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);
  
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.2);
  }
`;

const BigNumber = styled.div`
  position: relative;
  height: 100px;
  
  & > * {
    color: blue !important;
    font-size: 40px;

    /* to the middle! */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Failed = styled.span`
  color: red;
`;

const TimeIcon = styled(IoMdTime)`
  font-size: 140%;
`;

export default ({ orders }: Props) => (
  <Layout>
    {
      orders.map(order => {
        const status = coalesce(
          order.failedAt && <Failed>Cancelled</Failed>,
          order.deliveredAt && "Delivered",
          order.cookedAt && "On its way",
          order.capturedAt && "Ready to cook",
          order.verifiedAt && "Verified",
          order.authorizedAt && "Received",
          "Created"
        );
        const latestTimestamp = coalesce(
          order.failedAt,
          order.deliveredAt,
          order.cookedAt,
          order.capturedAt,
          order.verifiedAt,
          order.authorizedAt,
          order.createdAt,
        );
        return (
          <Card key={order.id}>
            <BigNumber>
              <Link to={`/orders/${order.id}`}>#{order.id}</Link>
            </BigNumber>
            <Status label="Total" value={formatCurrency(order.amount)} />
            <Status label="Status" value={status} />
            <Status label={<TimeIcon />} value={latestTimestamp} />
          </Card>
        );
      })
    }
  </Layout>
);
