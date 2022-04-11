import produce, { Draft } from "immer";
import Post from "../models/Post";

interface SortByParameters<T> {
  by: (a: Draft<T>, b: Draft<T>) => number;
  array: T[];
}

export const sortBy = <T>({
  by,
  array,
}: Readonly<SortByParameters<T>>): T[] => {
  return produce(array, (draft) => {
    draft.sort(by);
  });
};

export const like = (post: Post, userId: number): Post => {
  return produce(post, (draft) => {
    if (!post.likes.includes(userId)) {
      draft.likes.push(userId);
    } else {
      draft.likes.splice(draft.likes.indexOf(userId), 1);
    }
  });
};
