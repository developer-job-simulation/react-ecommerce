export function getCartSize(cart) {
  return cart.reduce((prev, curr) => prev + curr.quantity, 0);
}
