import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/helpers/Loading";

const useInfiniteScroll = <T,>(array: T[]) => {
  const [count, setCount] = useState({
    prev: 0,
    next: 10,
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(array.slice(count.prev, count.next));

  const getMoreData = () => {
    if (current.length === array.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setCurrent(current.concat(array.slice(count.prev + 10, count.next + 10)));
    }, 2000);

    setCount((prevState) => ({
      prev: prevState.prev + 10,
      next: prevState.next + 10,
    }));
  };

  return {
    current,
    infiniteScroll: (element: React.ReactNode) => (
      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<Loading />}
      >
        {element}
      </InfiniteScroll>
    ),
  };
};

export default useInfiniteScroll;
