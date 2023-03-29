import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithTokenRefresh } from './baseQuery';

const mainInfoApi = createApi({
  reducerPath: 'mainInfo',
  baseQuery: baseQueryWithTokenRefresh,

  endpoints(build) {
    return {
      fetchMainInfo: build.query({
        query: () => {
          return {
            url: 'main_info/main_info/',
            method: 'GET',
          };
        },
      }),

      updateMainInfo: build.mutation({
        query: (newData) => {
          return {
            url: 'main_info/main_info/',
            method: 'POST',
            body: newData,
          };
        },
      }),

      fetchAboutUs: build.query({
        query: () => {
          return {
            url: 'main_info/about_us/',
            method: 'GET',
          };
        },
      }),

      updateAboutUs: build.mutation({
        query: (newData) => {
          return {
            url: 'main_info/about_us/',
            method: 'POST',
            body: newData,
          };
        },
      }),

      fetchPhoneNumber: build.query({
        query: () => {
          return {
            url: 'main_info/phone_number',
            method: 'GET',
          };
        },
      }),

      fetchSocialMedia: build.query({
        query: () => {
          return {
            url: 'main_info/social_media/',
          };
        },
      }),
    };
  },
});

export { mainInfoApi };

export const {
  useFetchMainInfoQuery,
  useUpdateMainInfoMutation,
  useFetchAboutUsQuery,
  useUpdateAboutUsMutation,
  useFetchPhoneNumberQuery,
  useFetchSocialMediaQuery,
} = mainInfoApi;
