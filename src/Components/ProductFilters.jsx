import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductFilters({ filterOptions, setFilterOptions, sortOptions, setSortOptions, products, setProducts, default_products }) {
  
  // add a state to display the filter number in real time 
  const [filter_num, set_filter_num] = useState(0);

  // define a new sort function 
  const customSort=( criteria )=>{

    const productsCopy = [...products];

    if( criteria == "Price")
      productsCopy.sort(function(a, b){return a.price - b.price});
    else if ( criteria == "Newest" )
      productsCopy.sort(function(a, b){return Number(a.releaseDate) - Number(b.releaseDate) });
      
    return productsCopy;
  };


  const customFilter = ()=>{
    const productsCopy = [...default_products];

    // filter price first
    let price_i=0

    // Consider if all the price filters are unchecked
    for(; price_i < filterOptions["price"].length ; price_i++)
    {
      if (filterOptions["price"][price_i].checked == true )
      break;
    }


    if( price_i != filterOptions["price"].length ){
      // memorize the default order
      for(let i=0; i<productsCopy.length; i++){
        for(let j=0; j<filterOptions["price"].length; j++)
        {
          if(filterOptions["price"][j].checked == false)
          {
            if (
              productsCopy[i].price<= filterOptions["price"][j].maxValue &&
              productsCopy[i].price >= filterOptions["price"][j].minValue)
              {
                productsCopy.splice(i, 1);
                i--;
                break;
              }
          }
        }
      }
    }
    // filter color second
    let color_i=0

    // Consider if all the color filters are unchecked
    for(; color_i < filterOptions["color"].length ; color_i++)
    {
      if (filterOptions["color"][color_i].checked == true )
      break;
    }


    if( color_i != filterOptions["color"].length ){
      // memorize the default order
      for(let i=0; i<productsCopy.length; i++){
        for(let j=0; j<filterOptions["color"].length; j++)
        {
          if(filterOptions["color"][j].checked == false)
          {
            if ( productsCopy[i].color == filterOptions["color"][j].value )
              {
                productsCopy.splice(i, 1);
                i--;
                break;
              }
          }
        }
      }
    }
    setProducts(productsCopy);
  }

  const clearFilter=()=>{

    

    const all_checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
    all_checkboxes.forEach(
      element=>{
        element.checked=false;
      }
    );
    
    setProducts(default_products );

  }

  useEffect(
    ()=>{

      if(filter_num != 0)
       customFilter();
      else 
       clearFilter();
      

      console.log("default_products");
      console.log(default_products);
      console.log("products");
      console.log(products);
      console.log("filterOptions");
      console.log(filterOptions);
    }, [filter_num]
  )

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
              {filter_num} Filters
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button type="button" className="text-gray-500"
              onClick={ ()=>{
                set_filter_num(0);

                const new_price_filterOptions = [];
                filterOptions["price"].forEach(element => {
                    
                  new_price_filterOptions.push({ 
                    minValue: element.minValue, 
                    maxValue: element.maxValue, 
                    label: element.label, 
                    checked: false });        
                });

                const new_color_filterOptions = [];
                filterOptions["color"].forEach(element => {
                    
                  new_color_filterOptions.push({ 
                    value: element.value, 
                    label: element.label, 
                    checked: false });
                    
                });
                setFilterOptions({price:new_price_filterOptions, color:new_color_filterOptions});
                
              } }
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
                  <div key={option.minValue} className="flex items-center text-base sm:text-sm">
                    <input
                      onChange={ (e)=>{
                        if(e.currentTarget.checked)
                          set_filter_num(filter_num+1);
                        else
                          set_filter_num(filter_num-1);

                        
                        
                        // 1 bold the current filter option
                        const new_price_filterOptions = [];
                        filterOptions["price"].forEach(element => {
                          if (element.minValue == e.currentTarget.defaultValue )
                            {
                              new_price_filterOptions.push({ 
                                minValue: element.minValue, 
                                maxValue: element.maxValue, 
                                label: element.label, 
                                checked: e.currentTarget.checked });
                            }
                          else
                            new_price_filterOptions.push(element);
                        });
                        setFilterOptions({price:new_price_filterOptions, color:filterOptions["color"]});
                        }
                      }
                        

                      id={`price-${optionIdx}`}
                      name="price[]"
                      defaultValue={option.minValue}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
                      defaultChecked={option.checked}
                    />
                    <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
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
                  <div key={option.value} className="flex items-center text-base sm:text-sm">
                    <input
                      onChange={(e) => {
                        if(e.currentTarget.checked)
                          set_filter_num(filter_num+1);
                        else
                          set_filter_num(filter_num-1);

                        // 1 bold the current filter option
                        const new_color_filterOptions = [];
                        filterOptions["color"].forEach(element => {
                          if (element.value == e.currentTarget.defaultValue )
                            {
                              new_color_filterOptions.push({ 
                                value: element.value, 
                                label: element.label, 
                                checked: e.currentTarget.checked });
                            }
                          else
                            new_color_filterOptions.push(element);
                        });
                        setFilterOptions({price:filterOptions["price"], color:new_color_filterOptions});

                      }}

                      id={`color-${optionIdx}`}
                      name="color[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
                      defaultChecked={option.checked}
                    />
                    <label htmlFor={`color-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
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
                            // TODO

                            // 1 bold the current sort option
                            const new_sortOptions = [];
                            sortOptions.forEach(element => {
                              if (element.name == option.name)
                                {
                                  new_sortOptions.push({name: element.name, current:true});
                                  
                                }
                              else
                                new_sortOptions.push({name: element.name, current: false });
                            });
                            setSortOptions(new_sortOptions);

                            // 2 sort accordingly
                            setProducts(customSort(option.name));

                          }}
                          className={classNames(
                            option.current ? "font-medium text-gray-900" : "text-gray-500",
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm"
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
