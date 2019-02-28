import React from 'react';
import Header from '../components/Header';
import Divider from '../view/Divider';
import Item from '../view/Item';

import Items from '../bind/Items';
import AddToCart from '../bind/AddToCart';

const Menu = ({ }) => (
  <div>
    <Header />
    <Divider />
    <Items>
      {
        ({ items, loading }) => (
          <AddToCart>
            {
              ({ addToCart, loading: mutating }) => (
                <>
                  { 
                    items && items.map(item => (
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
        )
      }
    </Items>
  </div>
);

export default Menu;
