export function getCartSize(cart) {
  return cart.reduce((prev, curr) => prev + curr.quantity, 0);
}

export function getCartSubtotal(cart) {
  return cart.reduce((prev, curr) => prev + curr.quantity * curr.price, 0);
}

export function formatAsUSD(num) {
  return `$${Number.parseFloat(num).toFixed(2)}`;
}
