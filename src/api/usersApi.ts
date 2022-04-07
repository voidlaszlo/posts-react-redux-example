import User from "../models/User";
import api from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<User, void>({
      // TODO: implement real login logic instead of using user 1
      query: () => "/users/3",
    }),
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useLoginQuery, useGetUsersQuery, useGetUserByIdQuery } =
  usersApi;
