import { api as generatedApi } from "./types.generated";

export const userGQLApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Desks"],
  endpoints: {
    GetUserDesks: {
      providesTags: ["Desks"],
    },
  },
});

export const { useGetUserDesksQuery } = userGQLApi;
