import React, { useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {


  let local_cart = JSON.parse(localStorage.getItem("cart"));
  if (local_cart == undefined )
    local_cart  = [];

  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(local_cart);

  return (
    <main>
      <NavBar {...{ setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
