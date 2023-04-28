import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FilterIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';
import { useState, useRef } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductFilters({
  filterOptions,
  setFilterOptions,
  sortOptions,
  setSortOptions,
  products,
  setProducts,
  allProducts,
  getDefaultFilterOptions,
  selectedByPrice,
  setSelectedByPrice,
  selectedByColor,
  setSelectedByColor,
}) {
  const ref = useRef([]);
  const [priceFilterCount, setPriceFilterCount] = useState(0);
  const [colorFilterCount, setColorFilterCount] = useState(0);
  const uncheckRadio = () => {
    for (let i = 0; i < filterOptions.price.length; i++) {
      ref.current[`price-${i}`].checked = false;
    }
    for (let i = 0; i < filterOptions.color.length; i++) {
      ref.current[`color-${i}`].checked = false;
    }
  };
  const updateFilterOptions = (e) => {
    filterOptions.price.forEach((element) => {
      if (element.minValue.toString() === e.target.value) {
        if (element.checked === false) {
          element.checked = true;
        } else if (element.checked === true) element.checked = false;
      }
    });
  };
  const updateColorFilters = (e) => {
    filterOptions.color.forEach((element) => {
      if (element.value === e.target.value) {
        if (element.checked === false) {
          element.checked = true;
        } else if (element.checked === true) {
          element.checked = false;
        }
      }
    });
  };
  const updateProductsSelectedByPrice = () => {
    let selected_array = [];
    let selected_products = filterOptions.price.filter(function (x) {
      return x.checked === true;
    });
    selected_products.forEach((element) => {
      selected_array.push(
        allProducts.filter(function (item) {
          return item.price > element.minValue && item.price < element.maxValue;
        })
      );
    });
    setPriceFilterCount(selected_array.length);
    if (selected_array.length > 0) {
      setSelectedByPrice(selected_array.flat(1));
      setProducts(selected_array.flat(1));
    } else {
      if (selectedByColor.length > 0) {
        setProducts(selectedByColor);
      } else {
        setProducts(allProducts);
        setSelectedByPrice(allProducts);
      }
    }
  };

  const updateProductsSelectedByColor = () => {
    let selected_products_color = filterOptions.color.filter(function (x) {
      return x.checked === true;
    });
    let selected_array_color = [];

    if (selected_products_color.length > 0) {
      selected_products_color.forEach((element) => {
        if (allProducts !== products) {
          selected_array_color.push(
            products.filter(function (item) {
              return item.color === element.value;
            })
          );
          setProducts(selected_array_color.flat(1));
        } else {
          selected_array_color.push(
            allProducts.filter(function (item) {
              return item.color === element.value;
            })
          );
          setProducts(selected_array_color.flat(1));
        }
      });
    } else {
      if (selectedByPrice.length > 0) {
        setProducts(selectedByPrice);
      } else {
        setProducts(allProducts);
      }
    }
    setColorFilterCount(selected_array_color.length);
  };

  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="relative z-10  border-gray-200 grid items-center"
    >
      <h2 id="filter-heading" className="sr-only">
        Filters
      </h2>
      <div className="relative col-start-1 row-start-1 py-4">
        <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
          <div>
            <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
              <FilterIcon
                className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              {priceFilterCount + colorFilterCount} Filters
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button
              type="button"
              className="text-gray-500"
              onClick={() => {
                setProducts(allProducts);
                setPriceFilterCount(0);
                setColorFilterCount(0);

                setFilterOptions(getDefaultFilterOptions());
                uncheckRadio();
              }}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="border-gray-200 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend className="block font-medium">Price</legend>
              <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                {filterOptions.price.map((option, optionIdx) => (
                  <div
                    key={option.minValue}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`price-${optionIdx}`}
                      name="price[]"
                      ref={(element) => {
                        ref.current[`price-${optionIdx}`] = element;
                      }}
                      defaultValue={option.minValue}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
                      defaultChecked={option.checked}
                      onClick={(e) => {
                        updateFilterOptions(e);
                        updateProductsSelectedByPrice();
                      }}
                    />
                    <label
                      htmlFor={`price-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="block font-medium">Color</legend>
              <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                {filterOptions.color.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <input
                      id={`color-${optionIdx}`}
                      name="color[]"
                      ref={(element) => {
                        ref.current[`color-${optionIdx}`] = element;
                      }}
                      defaultValue={option.value}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
                      defaultChecked={option.checked}
                      onClick={(e) => {
                        updateColorFilters(e);
                        updateProductsSelectedByColor();
                      }}
                    />
                    <label
                      htmlFor={`color-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </Disclosure.Panel>
      <div className="col-start-1 row-start-1 py-4">
        <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Menu as="div" className="relative inline-block">
            <div className="flex">
              <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon
                  className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            if (option.name === 'Price') {
                              setSortOptions([
                                { name: 'Price', current: true },
                                { name: 'Newest', current: false },
                              ]);
                              setProducts(
                                products.sort((a, b) => a.price - b.price)
                              );
                            } else if (option.name === 'Newest') {
                              setSortOptions([
                                { name: 'Price', current: false },
                                { name: 'Newest', current: true },
                              ]);
                              setProducts(
                                products.sort(
                                  (a, b) => a.releaseDate - b.releaseDate
                                )
                              );
                            }
                          }}
                          className={classNames(
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </Disclosure>
  );
}
