import { ShoppingBagIcon } from "@heroicons/react/outline";
import React from "react";

export default function NavBar({ setOpen, cart })
{
  return (
    <div className="bg-white">
      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex justify-between items-center h-16">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex-1 lg:flex lg:items-center">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="w-auto h-8"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black&shade=600"
                        alt=""
                      />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Workflow</span>
                    <img
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black&shade=600"
                      alt=""
                      className="w-auto h-8"
                    />
                  </a>

                  <div className="flex flex-1 justify-end items-center">
                    <div className="flex items-center lg:ml-8">
                      {/* Cart Icon */}
                      <div className="flow-root ml-4 lg:ml-8">
                        <button onClick={() => setOpen(true)} className="flex items-center p-2 -m-2 group">
                          <ShoppingBagIcon
                            className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart ? cart.reduce((prev, cur) => prev + cur.quantity, 0) : 0}</span>
                          <span className="sr-only">items in cart, view bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
