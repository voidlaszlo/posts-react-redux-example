import User from "../models/User";
import api from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<User, void>({
      // TODO: implement real login logic instead of using user 1
      query: () => "/users/3",
      providesTags: ["User"],
    }),
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, number | undefined>({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    getUsersByIds: builder.query<User[], number[] | undefined>({
      query: (ids) => {
        let string = ids?.join("&id=");
        return `/users/?id=${string}`;
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUsersByIdsQuery,
} = usersApi;
