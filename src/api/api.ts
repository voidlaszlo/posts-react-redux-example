import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const URL = "http://localhost:3001/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json; charset=UTF-8");
      return headers;
    },
  }),
  tagTypes: ["Post", "User", "Comment"],
  endpoints: () => ({}),
});

export default api;
