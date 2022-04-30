import React, { useEffect, useState } from "react";
import ProductFilters from "./ProductFilters";

export default function ProductTable({ cart, updateCart }) {
  let [products, setProducts] = useState([]);

  useEffect(async () => {
    let res = await fetch("http://localhost:3001/products");
    let body = await res.json();
    setProducts(body);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <ProductFilters />

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
                <button
                  type="button"
                  className="hidden group-hover:block group-hover:opacity-50 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black"
                  onClick={() => {
                    let newCart = cart.slice();

                    if (!newCart.includes(product)) {
                      product.quantity = 1;
                      newCart.push(product);
                    } else {
                      newCart.map((p) => {
                        if (p.id === product.id) {
                          p.quantity += 1;
                        }
                      });
                    }

                    updateCart(newCart);
                  }}
                >
                  Add To Cart
                </button>
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
