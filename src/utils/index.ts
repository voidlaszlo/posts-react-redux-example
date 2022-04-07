import { NavigateFunction } from "react-router-dom";
import Post from "../models/Post";

export const navigateToStart = (navigate: NavigateFunction) => () =>
  navigate("../");

export const navigateBack = (navigate: NavigateFunction) => () => {
  navigate(-1);
};

export const splitStringAtSpace = (string: string | undefined): string[] => {
  if (string === undefined) {
    return [];
  }

  return string.split(" ");
};

export const getFirstChars = ([first, second]: string[]): string => {
  return `${first.charAt(0)}${second.charAt(0)}`;
};

export const sortByBodyLength = (posts: Post[]): Post[] => {
  return posts.slice().sort((a, b) => a.body.length - b.body.length);
};

export const sliceBy = (number: number, posts: Post[]): Post[] => {
  return posts.slice(number);
};

export const makeFirstLetterUpperCase = (
  string: string | undefined
): string | undefined => {
  if (!string) return undefined;
  const [first, ...rest] = string?.split("");
  return `${first.toLocaleUpperCase()}${rest.join("")}`;
};
