import React, { useEffect, useState } from 'react'
import Cart from '../Components/Cart'
import NavBar from '../Components/NavBar'
import ProductTable from '../Components/ProductTable'

function Home() {
  const [open, setOpen] = useState(false)
  const [cart, updateCart] = useState([])

  // Issue #2
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      updateCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const productsInCart = cart.reduce((s, p) => p.quantity + s, 0)

  return (
    <main>
      <NavBar {...{ setOpen, productsInCart }} />
      <Cart {...{ open, setOpen, cart, updateCart }} />
      <ProductTable {...{ cart, updateCart }} />
    </main>
  )
}

export default Home
