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
      putMainInfo: build.mutation({
        query: ({id, formdata}) => {
          return {
            url: `main_info/main_info/${id}/`,
            method: 'PATCH',
            body: formdata,
          };
        },
      }),
      putAboutUs: build.mutation({
        query: ({id, formdata}) => {
          return {
            url: `/main_info/about_us/${id}/`,
            method: 'PATCH',
            body: formdata,
          };
        },
      }),

      putSocialMedia: build.mutation({
        query: ({id, formdata}) => {
          return {
            url: `main_info/social_media/${id}`,
            method: 'PATCH',
            body: formdata,
          };
        },
      }),

      putPhoneNumber: build.mutation({
        query: ({id, formdata}) => {
          return {
            url: `/main_info/phone_number/${id}/`,
            method: 'PATCH',
            body: formdata,
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
      fetchMap: build.query({
        query: () => {
          return {
            url: '/main_info/map/',
            method: 'GET',
          };
        },
      }),

      putMap: build.mutation({
        query: ({id, formdata}) => {
          return {
            url: `/main_info/map/${id}/`,
            method: 'PATCH',
            body: formdata,
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
  useFetchMapQuery,
  useUpdateAboutUsMutation,
  useFetchPhoneNumberQuery,
  useFetchSocialMediaQuery,
  usePutMainInfoMutation,
  usePutAboutUsMutation,
  usePutSocialMediaMutation,
  usePutPhoneNumberMutation,
  usePutMapMutation,
} = mainInfoApi;
