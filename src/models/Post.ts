import Author from "./Author";

export default interface Post {
  id: number;
  likes: number;
  replies: number;
  views: number;
  author: Author;
  date: string;
  datetime: string;
  href: string;
  title: string;
  body: string;
}
