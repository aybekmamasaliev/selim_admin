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
    getServices: build.query({
      query: () => "services",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Services", id })),
              { type: "Services", id: "LIST" },
            ]
          : [{ type: "Services", id: "LIST" }],
    }),
    getNews: build.query({
      query: (count, reload) => `news?limit=${count}&offset=${reload}`,
      
    }),

    putAdvantages: build.mutation({
      query: ({ id, formdata }) => ({
        url: `advantages/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "Advantages", id: "LIST" }],
    }),
    putServices: build.mutation({
      query: ({ id, formdata }) => ({
        url: `services/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "Services", id: "LIST" }],
    }),
    putNews: build.mutation({
      query: ({ id, formdata }) => ({
        url: `news/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),
    delAdvantages: build.mutation({
      query: (id) => ({
        url: `advantages/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Advantages", id: "LIST" }],
    }),

    delServices: build.mutation({
      query: (id) => ({
        url: `services/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Services", id: "LIST" }],
    }),
    delNews: build.mutation({
      query: (id) => ({
        url: `news/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),

    addAdvantages: build.mutation({
      query: (body) => ({
        url: "advantages/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Advantages", id: "LIST" }],
    }),
    addServices: build.mutation({
      query: (body) => ({
        url: "services/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Services", id: "LIST" }],
    }),
    addNews: build.mutation({
      query: (body) => ({
        url: "news/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),
  }),
});

export { appSelimApi };

export const {
  useGetAdvantagetQuery,
  usePutAdvantagesMutation,
  useAddAdvantagesMutation,
  useDelAdvantagesMutation,
  useAddServicesMutation,
  useDelServicesMutation,
  usePutServicesMutation,
  useGetServicesQuery,
  useGetNewsQuery,
  usePutNewsMutation,
  useAddNewsMutation,
  useDelNewsMutation,
} = appSelimApi;
