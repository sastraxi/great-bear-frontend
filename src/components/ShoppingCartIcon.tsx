import React from 'react';
import styled from 'styled-components';
import { IoIosCart } from 'react-icons/io';

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
        <Icon />
        <b>0</b>
      </span>
    );
  }
}

export default ShoppingCartIcon;
