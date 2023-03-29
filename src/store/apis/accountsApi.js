import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://161.35.29.179:8001/accounts' }),
  endpoints(build) {
    return {
      fetchToken: build.mutation({
        query: (userData) => {
          return {
            url: '/login/',
            method: 'POST',
            body: userData,
          };
        },
      }),
    };
  },
});

export const { useFetchTokenMutation } = accountsApi;

export { accountsApi };
