import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../config/axios-base-query";
import {
  PatchUserProfileRequestDto,
  SuccessResponseDto,
  UserProfileMetadata,
} from "../dto/user-dto";

import { Photo, SearchImageReponse } from "../dto/photo-dto";

interface SearchImageParames extends Record<string, string> {
  q: string;
  limit: string;
  skip: string;
}

export const searchPhotoApi = createApi({
  reducerPath: "search-photo", // Unique key for the slice
  tagTypes: [""],
  baseQuery: axiosBaseQuery({
    baseUrl:
      (process.env.NEXT_PUBLIC_API_BASE_URL || "localhost") +
      "/image/api/v1/images",
  }), // Use the Axios base query
  endpoints: (builder) => ({
    searchPhotos: builder.mutation<SearchImageReponse, Record<string, any>>({
      // queryFn: async (
      //   arg: Record<string, any>,
      //   api,
      //   extraOptions,
      //   baseQuery
      // ) => {
      //   try {
      //     const response = await client.search<Photo>({
      //       index: "photos",
      //       body: arg,
      //     });
      //     return { data: response.body };
      //   } catch (error) {
      //     return {
      //       error: {
      //         status: 500,
      //         data: "Error searching photos",
      //       },
      //     };
      //   }
      // },
      query: (body: SearchImageParames) => {
        const urlParams = new URLSearchParams({ ...body });

        return {
          url: `/search?${urlParams.toString()}`,
          body: body,
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for the endpoints
export const { useSearchPhotosMutation } = searchPhotoApi;
