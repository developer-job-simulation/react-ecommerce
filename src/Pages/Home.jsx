import React, { useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

const cartKey = "cart";

function getCart() {
  return JSON.parse(window.localStorage.getItem(cartKey)) || [];
}

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(getCart());

  const updateCartAndLocalStorage = (c) => {
    updateCart(c);
    window.localStorage.setItem(cartKey, JSON.stringify(c));
  };

  return (
    <main>
      <NavBar {...{ setOpen, cart }} />
      <Cart {...{ open, setOpen, cart, updateCartAndLocalStorage }} />
      <ProductTable {...{ cart, updateCartAndLocalStorage }} />
    </main>
  );
}

export default Home;
