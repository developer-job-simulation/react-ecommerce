import React, { useEffect, useState } from "react";
import Cart from "../Components/Cart";
import NavBar from "../Components/NavBar";
import ProductTable from "../Components/ProductTable";

function Home() {
	const [open, setOpen] = useState(false);
	const [cart, updateCart] = useState([]);

	useEffect(() => {
		// on render, fetch the saved cart from local storage
		const savedCart = localStorage.getItem("cart");

		updateCart(JSON.parse(savedCart));
	}, []);

	useEffect(() => {
		// if the cart has been updated after intialization, save to local storage
		if (cart.length >= 0) {
			localStorage.setItem("cart", JSON.stringify([...cart]));
		}
	}, [cart]);

	return (
		<main>
			<NavBar {...{ setOpen }} />
			<Cart {...{ open, setOpen, cart, updateCart }} />
			<ProductTable {...{ cart, updateCart }} />
		</main>
	);
}

export default Home;
