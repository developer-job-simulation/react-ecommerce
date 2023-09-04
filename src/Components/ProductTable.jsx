import React, { useEffect, useState } from "react";
import ProductFilters from "./ProductFilters";

const getDefaultFilterOptions = () =>
{
  return {
    price: [
      { minValue: 0, maxValue: 25, label: "$0 - $25", checked: false },
      { minValue: 25, maxValue: 50, label: "$25 - $50", checked: false },
      { minValue: 50, maxValue: 75, label: "$50 - $75", checked: false },
      { minValue: 75, maxValue: Number.MAX_VALUE, label: "$75+", checked: false },
    ],
    color: [
      { value: "beige", label: "Beige", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "white", label: "White", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "gray", label: "Gray", checked: false },
      { value: "teal", label: "Teal", checked: false },
    ],
  };
};

const getDefaultSortOptions = () =>
{
  return [
    { name: "Price", current: false },
    { name: "Newest", current: false },
  ];
};

export default function ProductTable({ cart, updateCart })
{
  let [products, setProducts] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  const [filterOptions, setFilterOptions] = useState(getDefaultFilterOptions());
  const [sortOptions, setSortOptions] = useState(getDefaultSortOptions());

  useEffect(() =>
  {
    let fetchProducts = async () =>
    {
      console.info("Fetching Products...");
      let res = await fetch("http://localhost:3001/products");
      let body = await res.json();
      setAllProducts(body);
      setProducts(body);
      console.log(body);
    };
    fetchProducts();
  }, []);


  useEffect(() =>
  {
    for (let sortOption of sortOptions)
    {
      if (sortOption.current)
      {
        const sortKey = (() =>
        {
          switch (sortOption.name)
          {
            case "Price": return "price";
            case "Newest": return "releaseDate";
          }
        })();

        const sortedProducts = [...products].sort((a, b) => a[sortKey] - b[sortKey]);
        setProducts(sortedProducts);
      }
    }
  }, [sortOptions]);

  useEffect(() =>
  {
    let filter = false;
    let filteredProducts = [];
    for (let priceFilter of filterOptions["price"])
    {
      if (priceFilter.checked)
      {
        filter = true;
        const res = allProducts.filter((p) => p.price > priceFilter.minValue && p.price < priceFilter.maxValue);
        filteredProducts = [...filteredProducts, ...res];
      }
    }

    for (let colorFilter of filterOptions["color"])
    {
      if (colorFilter.checked)
      {
        filter = true;
        const res = allProducts.filter((p) => p.color === colorFilter.value);
        filteredProducts = [...filteredProducts, ...res];
      }
    }

    setProducts(filter ? filteredProducts : allProducts);
  }, [filterOptions]);

  return (
    <div className="bg-white">
      <div className="px-4 mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <ProductFilters {...{ filterOptions, setFilterOptions, sortOptions, setSortOptions }} />

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} className="group">
              <div className="overflow-hidden w-full bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="object-cover object-center w-full h-full"
                />
                <button
                  type="button"
                  className="hidden text-base font-medium text-white bg-black rounded-md border border-transparent shadow-sm group-hover:block group-hover:opacity-50"
                  onClick={() =>
                  {
                    let newCart = cart.slice();
                    console.log("cart.slice()", cart.slice());
                    if (!newCart.map(p => p.id).includes(product.id))
                    {
                      product.quantity = 1;
                      newCart.push(product);
                    } else
                    {
                      newCart.map((p) =>
                      {
                        if (p.id === product.id)
                        {
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
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
