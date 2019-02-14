import React from 'react';
import styled from 'styled-components';
import { IoIosCart } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Icon = styled(IoIosCart)`
  width: 20px;
  height: 20px;
  vertical-align: -4px;
  margin-right: 0.3em;
`;

class ShoppingCartIcon extends React.Component {
  render() {
    return (
      <span>
        <Link to="/cart">
          <Icon />
          <b>0</b>
        </Link>
      </span>
    );
  }
}

export default ShoppingCartIcon;
