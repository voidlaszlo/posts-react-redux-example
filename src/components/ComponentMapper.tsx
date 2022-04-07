import React from "react";

interface Props<T> {
  items?: T[];
  element: (item: T) => React.ReactNode;
}

const ComponentMapper = <T,>({ items, element }: Props<T>) => {
  return (
    <>
      {items?.map((item, index) => {
        return <React.Fragment key={index}>{element(item)}</React.Fragment>;
      })}
    </>
  );
};

export default ComponentMapper;
