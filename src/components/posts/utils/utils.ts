import Post from "../../../models/posts/post.model";

export const sortByBodyLength = (posts: Post[]): Post[] => {
  return posts.slice().sort((a, b) => a.body.length - b.body.length);
};

export const sliceBy = (number: number, posts: Post[]): Post[] => {
  return posts.slice(number);
};

export const makeFirstLetterUpperCase = (string: string): string => {
  const [first, ...rest] = string.split("");
  return `${first.toLocaleUpperCase()}${rest.join("")}`;
};
