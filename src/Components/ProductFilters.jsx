import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FilterIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";

function classNames(...classes)
{
  return classes.filter(Boolean).join(" ");
}

export default function ProductFilters({ filterOptions, setFilterOptions, sortOptions, setSortOptions })
{
  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="grid relative z-10 items-center border-gray-200"
    >
      <h2 id="filter-heading" className="sr-only">
        Filters
      </h2>
      <div className="relative col-start-1 row-start-1 py-4">
        <div className="flex px-4 mx-auto space-x-6 max-w-7xl text-sm divide-x divide-gray-200 sm:px-6 lg:px-8">
          <div>
            <Disclosure.Button className="flex items-center font-medium text-gray-700 group">
              <FilterIcon
                className="flex-none mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              0 Filters
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button type="button" className="text-gray-500">
              Clear all
            </button>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="py-10 border-gray-200">
        <div className="grid grid-cols-2 gap-x-4 px-4 mx-auto max-w-7xl text-sm sm:px-6 md:gap-x-6 lg:px-8">
          <div className="grid grid-cols-1 auto-rows-min gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend className="block font-medium">Price</legend>
              <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                {filterOptions.price.map((option, optionIdx) => (
                  <div key={option.minValue} className="flex items-center text-base sm:text-sm">
                    <input
                      id={`price-${optionIdx}`}
                      name="price[]"
                      defaultValue={option.minValue}
                      type="checkbox"
                      className="flex-shrink-0 w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                      defaultChecked={option.checked}
                      onChange={(e) =>
                      {
                        setFilterOptions(options =>
                        {
                          const updatedOptions = { ...options };
                          updatedOptions["price"][optionIdx]["checked"] = e.target.checked;
                          return updatedOptions;
                        });
                      }}
                    />
                    <label htmlFor={`price-${optionIdx}`} className="flex-1 ml-3 min-w-0 text-gray-600">
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
                      id={`color-${optionIdx}`}
                      name="color[]"
                      defaultValue={option.value}
                      type="checkbox"
                      className="flex-shrink-0 w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                      defaultChecked={option.checked}
                      onChange={(e) =>
                      {
                        setFilterOptions(options =>
                        {
                          const updatedOptions = { ...options };
                          updatedOptions["color"][optionIdx]["checked"] = e.target.checked;
                          return updatedOptions;
                        });
                      }}
                    />
                    <label htmlFor={`color-${optionIdx}`} className="flex-1 ml-3 min-w-0 text-gray-600">
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
        <div className="flex justify-end px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Menu as="div" className="inline-block relative">
            <div className="flex">
              <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                Sort
                <ChevronDownIcon
                  className="flex-shrink-0 -mr-1 ml-1 w-5 h-5 text-gray-400 group-hover:text-gray-500"
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
              <Menu.Items className="absolute right-0 mt-2 w-40 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-2xl origin-top-right focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <button
                          onClick={() =>
                          {
                            // TODO
                            setSortOptions(options => options.map((opt) =>
                              ({ ...opt, current: opt.name === option.name })));
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
    </Disclosure >
  );
}
