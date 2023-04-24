import React, { useState } from 'react';
import Cart from '../Components/Cart';
import NavBar from '../Components/NavBar';
import ProductTable from '../Components/ProductTable';

function Home() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState(JSON.parse(window.localStorage.getItem('local_storage_cart')) ||[]);
  const [cartsubtotal, setCartSubTotal] = useState([]);



  return (
    <main>
      <NavBar {...{ setOpen, cart }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart,cartsubtotal}} />
    </main>
  );
}

export default Home;
