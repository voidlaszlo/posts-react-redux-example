import Comment from "../models/Comment";
import api from "./api";

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (id) => `/comments?postId=${id}`,
    }),
    postComment: builder.mutation<Comment, Partial<Comment>>({
      query: (body) => ({
        url: `/comments`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetCommentsByPostIdQuery, usePostCommentMutation } =
  commentsApi;
