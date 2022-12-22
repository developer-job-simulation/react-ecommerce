import React, { useEffect, useState } from "react";
import ProductFilters from "./ProductFilters";

const getDefaultFilterOptions = () => {
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

const getDefaultSortOptions = () => {
  return [
    { name: "Price", current: false },
    { name: "Newest", current: false },
  ];
};

let ogProducts =[];

export default function ProductTable({ cart, updateCart }) {
  let [products, setProducts] = useState([]);

  const [filterOptions, setFilterOptions] = useState(getDefaultFilterOptions());
  const [sortOptions, setSortOptions] = useState(getDefaultSortOptions());
  const [count, setCount] = useState(0);

  useEffect(async () => {
    console.info("Fetching Products...");
    let res = await fetch("http://localhost:3001/products");
    let body = await res.json();
    ogProducts = body;
    setProducts(body);
  },[]); //This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run

    useEffect(() => {
      let newProducts = [...ogProducts];
      console.log(newProducts)
      let priceFilterSelected = filterOptions.price.filter((item) => item.checked);
      let colorFilterSelected = filterOptions.color.filter((item) => item.checked);
      if (colorFilterSelected.length >= 1){
        let filterColor = colorFilterSelected.map(item => item.value)
        newProducts = newProducts.filter(product => {return filterColor.includes(product.color)});
      }
      if (priceFilterSelected.length >= 1){
        // let lowerFilterPrice = priceFilterSelected.map(item => item.minValue)
        // let upperFilterPrice= priceFilterSelected.map(item => item.maxValue)
        let lowest = Math.min(...(priceFilterSelected.map(item => item.minValue)));
        let highest = Math.max(...(priceFilterSelected.map(item => item.maxValue)));
        newProducts = newProducts.filter(product => {return  product.price >= lowest && product.price <= highest})
      }
      setProducts(newProducts)
    },[filterOptions]);

    let isInBetween = (lower, higher, value) =>  {
      if(lower.every(item => {console.log(value>=item); return value>=item}) && 
      higher.every(item2 => 
        {console.log(value+"---"+item2); console.log(value<=item2);
        value<=item2}) ){
        return true
      }
      else return false;
      
      }
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <ProductFilters {...{ filterOptions, setFilterOptions, sortOptions, setSortOptions, products, setProducts, getDefaultFilterOptions, count, setCount}} />
          
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} className="group">
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
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
