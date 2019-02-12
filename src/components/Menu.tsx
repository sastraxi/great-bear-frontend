import React from 'react';
import Header from './Header';
import Divider from '../view/Divider';
import Item from '../view/Item';

const Menu = ({ }) => (
  <div>
    <Header />
    <Divider />
    <Item
      price={1250}
      name="Hand-pulled pork noodles"
      description="Enjoy this tasty treat from the Gansu region of China."
      onAddToCart={() => alert('suh dude')}
      quantity={5}
      onQuantityUp={() => alert('suh dude')}
      onQuantityDown={() => alert('suh dude')}
      onRemoveFromCart={() => alert('suh dude')}
    />
    <Item
      price={1100}
      name="Moo shu pork"
      description="Who knew tacos were invented in China? Shredded pork, cabbage, and birds-eye chiles."
    />
  </div>
);

export default Menu;
