import React, { useState } from "react";
import Cart from "./Cart";
import NavBar from "./NavBar";
import ProductTable from "./ProductTable";

function App() {
  const [open, setOpen] = useState(false);
  const [cart, updateCart] = useState([]);

  return (
    <main>
      <NavBar {...{ setOpen }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  );
}

export default App;
