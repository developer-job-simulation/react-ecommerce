import React, { useState } from "react";
import { useEffect } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
	const [open, setOpen] = useState(false);
	const [cart, updateCart] = useState([]);
	const [cartSize, setCartSize] = useState(0);

	useEffect(() => {
		let cartSizeCount = 0;

		// runs through the cart array, counting the amount of items
		cart.forEach((product) => {
			cartSizeCount += product.quantity;
		});

		setCartSize(cartSizeCount);
	}, [cart]);

	return (
		<main>
			<NavBar {...{ setOpen, cartSize }} />
			<Cart {...{ open, setOpen, cart, updateCart }} />
			<ProductTable {...{ cart, updateCart }} />
		</main>
	);
}

export default Home;
