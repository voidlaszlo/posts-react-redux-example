import Post from "../models/Post";
import api from "./api";

const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    getPostById: builder.query<Post, string | undefined>({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"],
    }),
    getPostsByProfileId: builder.query<Post[], number | undefined>({
      query: (id) => `/posts?profileId=${id}`,
      providesTags: ["Post"],
    }),
    post: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `/posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    update: builder.mutation<Post, Partial<Post>>({
      query: ({ id, ...rest }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByProfileIdQuery,
  usePostMutation,
  useUpdateMutation,
} = postsApi;
