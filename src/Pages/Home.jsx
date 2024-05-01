import React, { useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";
import useLocalStorage from "../hooks/useLocalStorage";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useLocalStorage('cart', []);

  return (
    <main>
      <NavBar {...{ setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
