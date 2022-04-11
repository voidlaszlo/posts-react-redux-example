import Profile from "../models/Profile";
import api from "./api";

export const profilesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<Profile, string | SkipToken>({
      query: (id) => `/profiles/${id}`,
    }),
    getProfiles: builder.query<Profile[], void>({
      query: () => "profiles",
      providesTags: ["Profile"],
    }),
    getProfileById: builder.query<Profile, number | undefined>({
      query: (id) => `/profiles/${id}`,
      providesTags: ["Profile"],
    }),
    getProfilesByIds: builder.query<Profile[], number[] | undefined>({
      query: (ids) => {
        let string = ids?.join("&id=");
        return `/profiles/?id=${string}`;
      },
      providesTags: ["Profile"],
    }),
    updateProfileById: builder.mutation<Profile, Partial<Profile>>({
      query: ({ id, ...rest }) => ({
        url: `/profiles/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Profile"],
    }),
    getProfilesByName: builder.query<Profile[], string | SkipToken>({
      query: (name) => `/profiles?name_like=${name}`,
    }),
  }),
});

export const {
  useLoginQuery,
  useGetProfilesQuery,
  useGetProfileByIdQuery,
  useGetProfilesByIdsQuery,
  useGetProfilesByNameQuery,
  useUpdateProfileByIdMutation,
} = profilesApi;

type SkipToken = Symbol;
