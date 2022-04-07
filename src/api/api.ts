import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const URL = "https://jsonplaceholder.typicode.com/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json; charset=UTF-8");
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
