import React, { useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(() => {
    if (localStorage.getItem("cart"))
      return JSON.parse(localStorage.getItem("cart"));
    else return [];
  });
  //   const [cart, updateCart] = useState([]);

  console.log("here is the cart!", JSON.parse(localStorage.getItem("cart")));

  return (
    <main>
      <NavBar {...{ setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
