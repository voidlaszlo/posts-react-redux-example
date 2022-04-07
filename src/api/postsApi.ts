import Post from "../models/Post";
import api from "./api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),
    getPostById: builder.query<Post, string | undefined>({
      query: (id) => `/posts/${id}`,
    }),
    getPostsByUserId: builder.query<Post[], number | undefined>({
      query: (id) => `/posts?userId=${id}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
} = postsApi;
