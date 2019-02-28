import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IoIosCart } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { RenderProps as Props } from '../bind/CurrentCart';

const Container = styled.span`
  a {
    color: unset !important;
  }
`;

const Icon = styled(IoIosCart)`
  width: 20px;
  height: 20px;
  vertical-align: -4px;
  margin-right: 0.3em;
`;

const ShoppingCartIcon = ({ loading, totalQuantity, subscribe }: Props) => {
  useEffect(() => {    
    if (subscribe) subscribe();
  }, [!!subscribe]);

  if (loading) {
    return <Container>...</Container>;
  }

  return (
    <Container>
      <Link to="/cart">
        <Icon />
        <b>{ totalQuantity }</b>
      </Link>
    </Container>  
  );
};

export default ShoppingCartIcon;
