import React, { createContext, useState, useContext, useEffect } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase"; // Import auth from your firebase.js file
import { onAuthStateChanged } from "firebase/auth";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const getLocalStorage = () => {
  let store = localStorage.getItem('store');
  if (store) {
    return (store = JSON.parse(localStorage.getItem('store')));
  } else {
    return [];
  }
}

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getLocalStorage());
  const [isOpen, setIsOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(cartItems));
  }, [cartItems]);

  const add = () => toast.success('Added item to the cart', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });;

    const remove = () => toast.error('Removed item from the cart', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });;

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const addItemToCart = (id) => {
    if(userLoggedIn !== true) {
      toast.error('Please login first', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });;
    } else {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        add();
        return [...currItem, { id, quantity: 1 }];
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }};

  const decreaseCartQuantity = (id) => {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id)?.quantity === 1) {
        return currItem.filter((item) => item.id !== id);
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    remove();
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const value = {
    cartItems,
    getItemQuantity,
    addItemToCart,
    decreaseCartQuantity,
    removeItemFromCart,
    clearCart,
    cartQuantity,
    openCart,
    closeCart,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
