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
    getReviews: build.query({
      query: () => "review",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Reviews", id })),
              { type: "Reviews", id: "LIST" },
            ]
          : [{ type: "Reviews", id: "LIST" }],
    }),
    getNews: build.query({
      query: (count, reload) => `news?limit=${count}&offset=${reload}`,
      
    }),
    getCategories: build.query({
      query: () => "categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Categories", id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    getFeedBack: build.query({
      query: () => "feedback",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "FeedBack", id })),
              { type: "FeedBack", id: "LIST" },
            ]
          : [{ type: "FeedBack", id: "LIST" }],
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
    putReviews: build.mutation({
      query: ({ id, formdata }) => ({
        url: `review/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),
    putSubMenuImg: build.mutation({
      query: ({ id, formdata }) => ({
        url: `news_images/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
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
    delReviews: build.mutation({
      query: (id) => ({
        url: `review/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),
    delSubNewsFile: build.mutation({
      query: (id) => ({
        url: `news_images/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),

    delFeedBack: build.mutation({
      query: (id) => ({
        url: `feedback/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "FeedBack", id: "LIST" }],
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
    addReviews: build.mutation({
      query: (body) => ({
        url: "review/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),
    addSubNewsImg: build.mutation({
      query: (body) => ({
        url: "news_images/",
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
  useGetReviewsQuery,
  usePutReviewsMutation,
  useDelReviewsMutation,
  useAddReviewsMutation,
  useAddSubNewsImgMutation,
  useDelSubNewsFileMutation,
  usePutSubMenuImgMutation,
  useGetCategoriesQuery,
  useGetFeedBackQuery,
  useDelFeedBackMutation,
} = appSelimApi;
