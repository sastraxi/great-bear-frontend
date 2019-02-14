import React, { Component } from 'react';
import styled from 'styled-components';
import ItemImage from './ItemImage';

import { formatCents, getIsoCurrency } from '../util/currency';

const IMAGE_SIZE = '80px';

const Container = styled.div`
  display: flex;

  & + & {
    margin-top: 10px;
  }

  & > * {
    flex-shrink: 0;
  }
`;

const Details = styled.div`
  margin: auto 10px;
  flex-grow: 1;
  flex-shrink: 1;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Description = styled.div`
  margin-bottom: 10px;
`;

const Price = styled.div`
  color: rgb(60, 180, 60);
`;

const Quantity = styled.div`
  text-align: center;
  vertical-align: middle;
  padding: 10px;
`;

interface Props {
  imageUrl?: string,
  name: string,
  description: string,
  price: number,
  quantity?: number,
  onAddToCart?(): void,
  onQuantityUp?(): void,
  onQuantityDown?(): void,
  onRemoveFromCart?(): void,
}

class Item extends Component<Props> {
  render() {
    const {
      imageUrl, name, description, price, quantity,
      onAddToCart, onQuantityUp, onQuantityDown, onRemoveFromCart,
    } = this.props;
    return (
      <Container>
        { onAddToCart && <button onClick={onAddToCart}>+</button> }
        <ItemImage src={imageUrl} size={IMAGE_SIZE} />
        <Details>
          <Name>{ name }</Name>
          <Description>{ description}</Description>
          <Price>{ formatCents(price) } { getIsoCurrency().toUpperCase() }</Price>
        </Details>
        { quantity && <Quantity>{ quantity }</Quantity> }
        { onQuantityUp && <button onClick={onQuantityUp}>+1</button> }
        { onQuantityDown && <button onClick={onQuantityDown}>-1</button> }
        { onRemoveFromCart && <button onClick={onRemoveFromCart}>X</button> }
      </Container>
    );
  }
}

export default Item;
