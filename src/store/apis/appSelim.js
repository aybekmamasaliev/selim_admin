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
    getFeedBack: build.query({
      query: ({limit,reload}) => `feedback?limit=${limit}&offset=${reload}`,
    }),
    // getFeedBack: build.query({
    //   query: () => "feedback?limit=${count}&offset=${reload}",
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: "FeedBack", id })),
    //           { type: "FeedBack", id: "LIST" },
    //         ]
    //       : [{ type: "FeedBack", id: "LIST" }],
    // }),
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
    getCategoryAdvantages: build.query({
      query: () => "category-advantages",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "CategoryAdvantages", id })),
              { type: "CategoryAdvantages", id: "LIST" },
            ]
          : [{ type: "CategoryAdvantages", id: "LIST" }],
    }),

    getProducts: build.query({
      query: () => "products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getAdminusers: build.query({
      query: () => "accounts/users_list/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Adminusers", id })),
              { type: "Adminusers", id: "LIST" },
            ]
          : [{ type: "Adminusers", id: "LIST" }],
    }),
    getCategoryDetails: build.query({
      query: (id) => `categories/${id}/`,
    }),

    getMap: build.query({
      query: () => "/main_info/map/",
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
    putCategories: build.mutation({
      query: ({ id, formdata }) => ({
        url: `categories/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    putCategoryAdvantages: build.mutation({
      query: ({formdata ,id}) => ({
        url: `category-advantages/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "CategoryAdvantages", id: "LIST" }],
    }),

    putMap: build.mutation({
      query: ({formdata ,id}) => ({
        url: `main_info/map/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "Map", id: "LIST" }],
    }),

    putAdminUser: build.mutation({
      query: ({formdata ,id}) => ({
        url: `accounts/profile/${id}/`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: [{ type: "Adminusers", id: "LIST" }],
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
    delCategory: build.mutation({
      query: (id) => ({
        url: `categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    delCategoryAdvantages: build.mutation({
      query: (id) => ({
        url: `category-advantages/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CategoryAdvantages", id: "LIST" }],
    }),

    delProducts: build.mutation({
      query: (id) => ({
        url: `products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    delAdminusers: build.mutation({
      query: (id) => ({
        url: `accounts/profile/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Adminusers", id: "LIST" }],
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
    addCategory: build.mutation({
      query: (body) => ({
        url: "categories/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    addCategoryAdvantages: build.mutation({
      query: (body) => ({
        url: `category-advantages/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CategoryAdvantages", id: "LIST" }],
    }),

    addMapLocation: build.mutation({
      query: (body) => ({
        url: `main_info/map/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Map", id: "LIST" }],
    }),

    addProducts: build.mutation({
      query: (body) => ({
        url: `products`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    addNewAdmin: build.mutation({
      query: (body) => ({
        url: `accounts/register/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Adminusers", id: "LIST" }],
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
  useGetFeedBackQuery,
  useDelFeedBackMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  usePutCategoriesMutation,
  useDelCategoryMutation,
  useGetCategoryAdvantagesQuery,
  useAddCategoryAdvantagesMutation,
  useDelCategoryAdvantagesMutation,
  usePutCategoryAdvantagesMutation,
  useGetProductsQuery,
  useDelProductsMutation,
  useAddProductsMutation,
  useGetCategoryDetailsQuery,
  useGetAdminusersQuery,
  useDelAdminusersMutation,
  useAddNewAdminMutation,
  usePutAdminUserMutation,
} = appSelimApi;
