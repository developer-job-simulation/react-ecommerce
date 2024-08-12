import React, { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart));
  }, [cart])

  const cartSize = () => {
    let size = 0;
    for(let cartItem of cart){
      size += cartItem.quantity
    }
    return size;
  }

  return (
    <main>
      <NavBar cartSize={cartSize()} {...{ setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default Home;
