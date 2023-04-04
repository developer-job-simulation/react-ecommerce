import React, { useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
  const [open, setOpen] = useState(false);
  const initialCart = JSON.parse(localStorage.getItem('cart-item')) || [];
  const [cart, updateCart] = useState(initialCart);


  return (
    <main>
      <NavBar {...{ cart, setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
