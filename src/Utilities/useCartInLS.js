import { useEffect } from "react";

const CART_LS_KEY = "cart";

export default function useCartInLS(cart, updateCart) {
  useEffect(() => {
    if (localStorage.getItem(CART_LS_KEY) === null) return;
    updateCart(JSON.parse(localStorage.getItem(CART_LS_KEY)));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_LS_KEY, JSON.stringify(cart));
  }, [cart]);
}
