/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useGetProfilesByNameQuery } from "../../api/profilesApi";
import { useNavigate } from "react-router-dom";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchBar() {
  let navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState<string | symbol>(
    skipToken
  );
  const { data: profiles } = useGetProfilesByNameQuery(searchInputValue);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSearchInputValue(e.target.value);
    } else {
      setSearchInputValue(skipToken);
    }
  };

  const navigateToProfile = (href: string) => {
    navigate(href);
    setSearchInputValue("");
  };

  return (
    <Combobox as="div" value={searchInputValue} onChange={setSearchInputValue}>
      <div className="relative mt-1">
        <Combobox.Input
          autoComplete="off"
          displayValue={() =>
            typeof searchInputValue === "string" ? searchInputValue : ""
          }
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => handleSearchInputChange(e)}
        />
        {profiles && searchInputValue !== skipToken && profiles.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {profiles.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <div
                      onClick={() => {
                        navigateToProfile(person.href);
                      }}
                      className="flex items-center"
                    >
                      <img
                        src={person.imageUrl}
                        alt=""
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={classNames(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {person.name}
                      </span>
                    </div>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
