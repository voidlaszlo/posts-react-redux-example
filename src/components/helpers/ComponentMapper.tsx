import React from "react";

interface Props<T> {
  items?: T[];
  elementRenderer: (item: T) => React.ReactNode;
}

const ComponentMapper = <T,>({ items, elementRenderer }: Props<T>) => {
  return (
    <>
      {items?.map((item, index) => {
        return (
          <React.Fragment key={index}>{elementRenderer(item)}</React.Fragment>
        );
      })}
    </>
  );
};

export default ComponentMapper;
