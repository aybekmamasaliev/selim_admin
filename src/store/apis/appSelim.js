import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithTokenRefresh } from "./baseQuery";

const appSelimApi = createApi({
  reducerPath: "appSelim",
  baseQuery: baseQueryWithTokenRefresh,
  endpoints: (build) => ({
    getAdvantaget: build.query({
      query: () => "advantages",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Advantages", id })),
              { type: "Advantages", id: "LIST" },
            ]
          : [{ type: "Advantages", id: "LIST" }],
    }),
    putAdvantages: build.mutation({
      query: (id) => ({
        url: `advantages/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Advantages", id: "LIST" }],
    }),
    delAdvantages: build.mutation({
        query: (id) => ({
          url: `advantages/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Advantages", id: "LIST" }],
      }),

    addAdvantages: build.mutation({
      query: (body) => ({
        url: "advantages",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "FeedBack", id: "LIST" }],
    }),
  }),
});

export { appSelimApi };

export const {
  useGetAdvantagetQuery,
  usePutAdvantagesMutation,
  useAddAdvantagesMutation,
  useDelAdvantagesMutation,
} = appSelimApi;
