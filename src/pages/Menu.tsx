import React from 'react';
import Header from '../components/Header';
import Divider from '../view/Divider';
import Item from '../view/Item';
import AddToCart from '../bind/AddToCart';

const items = [
  {
    id: 1,
    price: 1250,
    name: "Hand-pulled pork noodles",
    description: "Enjoy this tasty treat from the Gansu region of China.",
  },
  {
    id: 2,
    price: 1100,
    name: "Moo shu pork",
    description: "Who knew tacos were invented in China? Shredded pork, cabbage, and birds-eye chiles.",
    imageUrl: "https://static01.nyt.com/images/2016/09/28/dining/28CHINESE-WEB2/28CHINESE-WEB2-articleLarge.jpg",
  },
];

const Menu = ({ }) => (
  <div>
    <Header />
    <Divider />
    <AddToCart>
      {
        ({ addToCart, loading }) => (
          <>
            { 
              items.map(item => (
                <Item
                  key={item.id}
                  {...item}
                  onAddToCart={() => addToCart(item.id, 1)}
                />
              ))
            }
          </>
        )
      }
    </AddToCart>
  </div>
);

export default Menu;
