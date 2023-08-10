import { Dialog, Transition } from '@headlessui/react'
import { XIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'

export default function Cart({ open, setOpen, cart, updateCart }) {
  const subTotal = cart.reduce((s, p) => p.price * p.quantity + s, 0)

  return (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-10"
        onClose={() => {
          setOpen
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            onClick={() => setOpen(false)}
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {' '}
                        Shopping cart{' '}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>

                    <div
                      className={
                        cart.length === 0
                          ? 'mt-8 flex h-full items-center justify-center'
                          : 'mt-8'
                      }
                    >
                      <div className="flow-root">
                        {cart.length === 0 ? (
                          <div className="flex flex-col items-center">
                            <ShoppingCartIcon
                              className="w-12"
                              aria-hidden="true"
                            />
                            <span className="pt-2">Your Cart is Empty.</span>
                          </div>
                        ) : (
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart.map((product) => (
                              <li
                                key={product.id}
                                className="flex py-6"
                              >
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{product.name}</h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {product.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        onClick={() => {
                                          let newCart = cart.filter((p) => {
                                            if (p.id === product.id) {
                                              p.quantity -= 1
                                            }

                                            return p.quantity > 0
                                          })
                                          updateCart(newCart)
                                          // Issue #2
                                          localStorage.setItem(
                                            'cart',
                                            JSON.stringify(newCart)
                                          )
                                        }}
                                        type="button"
                                        className="font-medium text-gray-500 hover:text-black"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subTotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="font-medium text-gray-700 hover:text-black"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
