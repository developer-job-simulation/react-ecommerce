import { useEffect } from "react";

const optionToCompareFn = {
  Price: function ascPrice(a, b) {
    return a.price - b.price;
  },
  Newest: function ascReleaseDate(a, b) {
    return Number(a.releaseDate) - Number(b.releaseDate);
  },
};

export default function useProductSort(sortOptions, products, setProducts) {
  useEffect(() => {
    const sortOption = sortOptions.find((option) => option.current);
    if (sortOption === undefined) return;
    let sortedProducts = products.slice();
    sortedProducts.sort(optionToCompareFn[sortOption.name]);
    setProducts(sortedProducts);
  }, [sortOptions]);
}
