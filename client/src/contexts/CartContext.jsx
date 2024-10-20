import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i._id === item._id && i.size === item.size);
      if (existingItem) {
        return prevItems.map(i => 
          i._id === item._id && i.size === item.size 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, size, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId && item.size === size 
          ? { ...item, quantity: newQuantity } 
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId, size) => {
    setCartItems(prevItems => prevItems.filter(item => !(item._id === itemId && item.size === size)));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const isItemInCart = (itemId, size) => {
    return cartItems.some(item => item._id === itemId && item.size === size);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      isCartOpen, 
      toggleCart,
      cartTotal,
      isItemInCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
