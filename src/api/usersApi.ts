import User from "../models/User";
import api from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<User, string | SkipToken>({
      // TODO: implement real login logic instead of using user 1
      query: (id) => `/users/${id}`,
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
    updateUser: builder.mutation<User, Partial<User>>({
      query: ({ id, ...rest }) => ({
        url: `/useres/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUsersByIdsQuery,
  useUpdateUserMutation,
} = usersApi;

type SkipToken = Symbol;
