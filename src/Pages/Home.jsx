import React, { useState, useRef } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";
import { useEffect } from "react";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(() => JSON.parse(window.localStorage.getItem('cart')) || []);
  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  },[cart])
  return (
    <main>
      <NavBar {...{ itemsInCart: cart.length, setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
