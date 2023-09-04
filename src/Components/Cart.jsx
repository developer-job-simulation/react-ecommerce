import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon, ShoppingCartIcon, XIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";

export default function Cart({ open, setOpen, cart, updateCart })
{
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="overflow-hidden fixed inset-0 z-10"
        onClose={() =>
        {
          setOpen(false);
        }}
      >
        <div className="overflow-hidden absolute inset-0">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="flex fixed inset-y-0 right-0 pl-10 max-w-full pointer-events-none">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md pointer-events-auto">
                <div className="flex overflow-y-scroll flex-col h-full bg-white shadow-xl">
                  <div className="overflow-y-auto flex-1 px-4 py-6 sm:px-6">
                    <div className="flex justify-between items-start">
                      <Dialog.Title className="text-lg font-medium text-gray-900"> Shopping cart </Dialog.Title>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          type="button"
                          className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>


                    <div className="mt-8">
                      {cart.length ?
                        <div className="flow-root">

                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="overflow-hidden flex-shrink-0 w-24 h-24 rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="object-cover object-center w-full h-full"
                                  />
                                </div>

                                <div className="flex flex-col flex-1 ml-4">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{product.name}</h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 justify-between items-end text-sm">
                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                        {
                                          let newCart = cart.filter((p) =>
                                          {
                                            if (p.id === product.id)
                                            {
                                              p.quantity -= 1;
                                            }

                                            return p.quantity > 0;
                                          });
                                          updateCart(newCart);
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
                        </div>
                        :
                        <div className="my-44">
                          <div className="flex flex-col items-center">
                            <ShoppingCartIcon
                              className="flex-shrink-0 w-24 h-24"
                              aria-hidden="true"
                            />
                            <p>Your Cart is Empty.</p>
                          </div>
                        </div>}
                    </div>
                  </div>

                  <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${cart.reduce((prev, cur) => prev + cur.quantity * cur.price, 0)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex justify-center items-center px-6 py-3 text-base font-medium text-white bg-gray-800 rounded-md border border-transparent shadow-sm hover:bg-black"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-medium text-gray-700 hover:text-black"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
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
  );
}
