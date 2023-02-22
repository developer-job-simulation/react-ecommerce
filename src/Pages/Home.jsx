import React, { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(() => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    return localCart ? localCart : []
  });

  // Read cart from localstorage on load
  // useEffect(() => {
  //   const cart = JSON.parse(localStorage.getItem('cart'))
  //   if (cart) {
  //     updateCart(cart)
  //   }
  // }, [])

  return (
    <main>
      <NavBar {...{ setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
