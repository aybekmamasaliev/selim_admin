import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { updateAccessToken } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://161.35.29.179:8001/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },

});


const baseQueryWithTokenRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result && result.error && result.error.status === 401) {
    // access token has expired

    const refreshResult = await baseQuery(
      {
        url: 'accounts/api/token/refresh/',
        method: 'POST',
        body: { refresh: api.getState().auth.refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // store new access token in redux store
      api.dispatch(updateAccessToken(refreshResult.data));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export { baseQueryWithTokenRefresh };
