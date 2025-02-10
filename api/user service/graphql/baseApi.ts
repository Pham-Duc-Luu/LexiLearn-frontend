import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";
import { Mutex } from "async-mutex";
import { RootState } from "@/store/Proto-slice/ProtoStore.slice";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

// export const graphqlApi = createApi({
//     reducerPath: "api/graphql",
//     baseQuery: axiosBaseQuery({
//         baseUrl:
//             (process.env.NEXT_PUBLIC_API_BASE_URL || "localhost") +
//             "/user/graphql",
//     }),
//     endpoints: () => ({}),
// });

const HEADER_TYPE_APPLICATION_FORM = "application/x-www-form-urlencoded";

export const client = new GraphQLClient(
  (process.env.NEXT_PUBLIC_API_BASE_URL || "localhost") + "/user/graphql"
);

const mutex = new Mutex();

// * define authentication endpoint
const authBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "localhost",
});

const graphqlBaseQuery = graphqlRequestBaseQuery({
  client,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.persistedReducer.auth.access_token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauthGraphql: BaseQueryFn = async (
  { document, variables },
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();
  let result;
  try {
    result = await graphqlBaseQuery({ document, variables }, api, extraOptions);

    const errors = result.meta;

    return result;
  } catch (e: any) {
    // Intercept HTTP 401 responses and do the refresh token call
    if (e && e.response && e.response.status === 401) {
      // Even if multiple apis fail simultaneously with 401
      // only allow one api call to refresh the token
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const { refresh_token, access_token } = (api.getState() as RootState)
            .persistedReducer.auth;
          // Use the proper refresh token request format here
          const refreshResult = await authBaseQuery(
            {
              url: "/user/api/v1/refresh-token",
              method: "GET",
              body: qs.stringify({ refresh_token, access_token }),
              headers: { "Content-Type": HEADER_TYPE_APPLICATION_FORM },
            },
            api,
            extraOptions
          );

          console.log(refreshResult);

          if (refreshResult.data) {
            // TODO : Dispatch the updated token information
            // api.dispatch(updateToken(refreshResult.data))

            // Once the tokens are updated, do the failed api call again
            result = await graphqlBaseQuery(
              { document, variables },
              api,
              extraOptions
            );
          } else {
            // TODO : Dispatch an error if the refresh token call threw an error
            // api.dispatch(updateRefreshTokenError(true))
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await graphqlBaseQuery(
          { document, variables },
          api,
          extraOptions
        );
      }
      return result;
    }
  }
};

export const baseApiWithGraphql = createApi({
  baseQuery: baseQueryWithReauthGraphql,
  reducerPath: "api/user/graphql",
  endpoints: () => ({}),
  tagTypes: [],
});
