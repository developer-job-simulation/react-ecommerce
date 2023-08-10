import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FilterIcon } from '@heroicons/react/solid'
import React, { Fragment, useEffect, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductFilters({
  filterOptions,
  setFilterOptions,
  sortOptions,
  setSortOptions,
  handleClear,
}) {
  function handleFilterChange(event) {
    const filter = event.target.value

    if (event.target.name.startsWith('color')) {
      // Color filter changed
      const newColorArray = filterOptions.color.map((c) =>
        c.value === filter ? { ...c, checked: !c.checked } : c
      )
      setFilterOptions({ ...filterOptions, color: newColorArray })
    } else {
      // Price filter changed
      const newPriceArray = filterOptions.price.map((p) =>
        p.minValue === Number(filter) ? { ...p, checked: !p.checked } : p
      )
      setFilterOptions({ ...filterOptions, price: newPriceArray })
    }
  }
  function countFilter() {
    return (
      filterOptions.price.reduce((s, p) => Number(p.checked) + s, 0) +
      filterOptions.color.reduce((s, c) => Number(c.checked) + s, 0)
    )
  }

  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="relative z-10  border-gray-200 grid items-center"
    >
      <h2
        id="filter-heading"
        className="sr-only"
      >
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
              {countFilter()} Filters
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button
              type="button"
              className="text-gray-500"
              onClick={handleClear}
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
                      defaultValue={option.minValue}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
                      checked={option.checked}
                      onChange={handleFilterChange}
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
                      defaultValue={option.value}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-black focus:ring-black"
                      checked={option.checked}
                      onChange={handleFilterChange}
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
          <Menu
            as="div"
            className="relative inline-block"
          >
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
                            const clikedOption = sortOptions.find(
                              (o) => o.name === option.name
                            )
                            const otherOption = sortOptions.find(
                              (o) => o.name !== option.name
                            )
                            if (!clikedOption.current) {
                              clikedOption.current = true
                              if (otherOption.current) {
                                otherOption.current = false
                              }
                            } else {
                              clikedOption.current = false
                            }
                            setSortOptions([clikedOption, otherOption])
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
  )
}
