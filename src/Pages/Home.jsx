import React, { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home()
{
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() =>
  {
    const cartItems = localStorage.getItem("cartItems");
    setCart(cartItems ? JSON.parse(cartItems) : [])
  }, []);
  const updateCart = (data) =>
  {
    localStorage.setItem("cartItems", JSON.stringify(data));
    setCart(data);
  };

  return (
    <main>
      <NavBar {...{ setOpen, cart }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
