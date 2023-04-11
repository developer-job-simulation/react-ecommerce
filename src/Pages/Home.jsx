import React, { useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";
import useCartInLS from "../Utilities/useCartInLS";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState([]);
  useCartInLS(cart, updateCart);

  return (
    <main>
      <NavBar {...{ setOpen, cart }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
