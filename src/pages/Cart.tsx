import React from 'react';
import Header from '../components/Header';
import Divider from '../view/Divider';
import Item from '../view/Item';
import { Elements } from 'react-stripe-elements';

import CurrentCart from '../bind/CurrentCart';
import CheckoutForm from '../components/CheckoutForm';
import SetCartQuantity from '../bind/SetCartQuantity';

const Cart = ({ }) => (
  <SetCartQuantity>
    {
      ({ setCartQuantity, loading: mutating }) => (
        <CurrentCart>
          {
            ({ cart, loading }) => {
              if (loading) {
                return <span>Loading...</span>;
              }

              const totalAmount = cart ? cart.items
                .map(ci => ci.quantity * ci.item.amount)
                .reduce((a, b) => a + b, 0) : 0;

              return (
                <>
                  <Header />
                  <Divider />
                  {
                    cart && cart.items.map(({ item, quantity }) => (
                      <Item
                        key={item.id}
                        {...item}
                        quantity={quantity}
                        onQuantityUp={() => setCartQuantity(item.id, quantity + 1)}
                        onQuantityDown={() => setCartQuantity(item.id, quantity - 1)}
                        onRemoveFromCart={() => setCartQuantity(item.id, 0)}
                      />
                    ))
                  }
                  { (!cart || cart.items.length === 0) &&
                    "Your cart is currently empty."
                  }
                  <Divider />
                  { cart && 
                    <Elements>
                      <CheckoutForm
                        cartId={cart!.id}
                        totalAmount={totalAmount}
                      />
                    </Elements>
                  }
                </>
              );
            }
          }
        </CurrentCart>
      )
    }
  </SetCartQuantity>    
);

export default Cart;
