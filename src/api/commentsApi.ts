import Comment from "../models/Comment";
import api from "./api";

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<Comment[], number | undefined>({
      query: (id) => `/comments?postId=${id}`,
      providesTags: ["Comment"],
    }),
    postComment: builder.mutation<Comment, Partial<Comment>>({
      query: (body) => ({
        url: `/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetCommentsByPostIdQuery, usePostCommentMutation } =
  commentsApi;
