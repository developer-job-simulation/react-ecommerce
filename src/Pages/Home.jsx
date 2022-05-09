import React, { useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
	const [open, setOpen] = useState(false);
	const [cart, updateCart] = useState([]);
	const [subtotal, setSubtotal] = useState(0);

	return (
		<main>
			<NavBar {...{ setOpen }} />
			<Cart {...{ open, setOpen, cart, updateCart, subtotal, setSubtotal }} />
			<ProductTable {...{ cart, updateCart, subtotal, setSubtotal }} />
		</main>
	);
}

export default Home;
