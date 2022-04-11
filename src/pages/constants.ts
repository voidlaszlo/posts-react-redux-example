import Post from "../models/Post";

export const RECENT = "Recent";
export const MOST_LIKED = "Most Liked";
export const MOST_VIEWED = "Most Viewed";

interface Tabs {
  name: string;
  by: (a: Post, b: Post) => number;
}

export const byRecent = (a: Post, b: Post) =>
  b.datetime.localeCompare(a.datetime);
export const byLikes = (a: Post, b: Post) => b.likes.length - a.likes.length;
export const byViews = (a: Post, b: Post) => b.views - a.views;

export const tabs: Tabs[] = [
  { name: RECENT, by: byRecent },
  { name: MOST_LIKED, by: byLikes },
  { name: MOST_VIEWED, by: byViews },
];
