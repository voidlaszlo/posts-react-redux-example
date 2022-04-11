import React from "react";
import { tabs } from "./constants";

interface Props {
  currentSortType: string;
  setCurrentSortType: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs: React.FC<Props> = (props: Readonly<Props>) => {
  const { currentSortType, setCurrentSortType } = props;

  const handleSelectSortType = (
    e: React.MouseEvent<HTMLButtonElement>,
    sortType: string
  ) => {
    e.preventDefault();
    setCurrentSortType(sortType);
  };

  const handleSelectOptionSortType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    setCurrentSortType(e.target.value);
  };

  return (
    <>
      <div className="px-4 sm:px-0 mt-4">
        <div className="sm:hidden">
          <label htmlFor="posts-tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="posts-tabs"
            onChange={(e) => handleSelectOptionSortType(e)}
            className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={currentSortType}
          >
            {tabs.map((tab: any) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
            aria-label="Tabs"
          >
            {tabs.map((tab: any, tabIdx: any) => (
              <button
                key={tab.name}
                onClick={(e) => handleSelectSortType(e, tab.name)}
                aria-current={tab.name === currentSortType ? "page" : undefined}
                className={classNames(
                  tab.name === currentSortType
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                )}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.name === currentSortType
                      ? "bg-rose-500"
                      : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default Tabs;
