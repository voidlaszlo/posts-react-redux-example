import React, { Fragment, useMemo, useState } from "react";
import { useGetPostsQuery } from "../../api/postsApi";
import {
  byLikes,
  byRecent,
  byViews,
  MOST_LIKED,
  MOST_VIEWED,
  tabs,
} from "../../constants/constants";
import { useAppSelector } from "../../hooks/hooks";
import Post from "../../models/Post";
import { selectProfile } from "../profiles/profileSlice";
import NewPost from "./NewPost";
import PostCard from "./PostCard";
import { sortBy } from "./postsUtils";
import Tabs from "./Tabs";

const Posts = () => {
  const { data: posts = [] } = useGetPostsQuery();
  const [currentSortType, setCurrentSortType] = useState<string>(tabs[0].name);
  const profile = useAppSelector(selectProfile);

  let postsToShow: Post[] = [];

  const sortedByRecent = useMemo(
    () => sortBy({ by: byRecent, array: posts }),
    [posts]
  );

  const sortedByLikes = useMemo(
    () => sortBy({ by: byLikes, array: posts }),
    [posts]
  );

  const sortedByViews = useMemo(
    () => sortBy({ by: byViews, array: posts }),
    [posts]
  );

  switch (currentSortType) {
    case MOST_LIKED:
      postsToShow = sortedByLikes;
      break;
    case MOST_VIEWED:
      postsToShow = sortedByViews;
      break;
    default:
      postsToShow = sortedByRecent;
      break;
  }

  return (
    <main className="px-2 lg:col-span-9 xl:col-span-6">
      <NewPost />
      <Tabs
        currentSortType={currentSortType}
        setCurrentSortType={setCurrentSortType}
      />
      <div className="mt-4">
        <h1 className="sr-only">${currentSortType} posts</h1>
        <ul className="space-y-4">
          {postsToShow.map((post) => (
            <Fragment key={post.id}>
              <PostCard post={post} profileId={profile ? profile.id : -1} />
            </Fragment>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Posts;
