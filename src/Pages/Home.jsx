import React, { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(() => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });

  useEffect(() => {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem("cart", cartJSON);
  }, [cart])

  return (
    <main>
      <NavBar {...{ setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
