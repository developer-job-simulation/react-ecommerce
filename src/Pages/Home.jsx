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

  // Trying to have one location to update the local storage when the cart state changes, but only when items are added or removed.
  // It doesn't make sense to overwrite the localstorage every time the page is loaded with the logic I have with state, above.
  // But this implementation isn't much better, since I'm reading from disk twice on first load, and then again every time the cart is updated.
  // The alternative that I'm aware of is to put it in the onClick actions for adding and removing from the cart, which probably makes more sense at this point in time.
  // That way, we're only reading/writing to disk as actually necessary, but it does spread the code to do the same thing across multiple components.
  useEffect(() => {
    if (cart != JSON.parse(localStorage.getItem('cart'))){
      localStorage.setItem('cart', JSON.stringify(cart))
    }
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
