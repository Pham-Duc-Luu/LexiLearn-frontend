interface IRouter {}

export const routeState = {
  DASHBOARD_ROUTE: () => "/dashboard/v2",
  COLLECTION_DETAILS: (id: string) => `/collection/${id}`,
  COLLECTION_FINISH: (id: string) => `/collection/${id}/finish`,
  COLLECTION_LEARN: (id: string) => `/collection/${id}/learn`,
  COLLECTION_CREATE: () => `/create/collection`,
  COLLECTION_EDIT: (id: string) => `/edit/collection/${id}`,
  SETTING: () => `/setting`,
  AUTH_SIGN_IN: () => `/auth/sign-in`,
  AUTH_SIGN_UP: () => `/auth/sign-up/v2`,
  AUTH_FORGOTPASSWORD: () => `/auth/forgot-password`,
};
export const routeProto = {
  HOME: () => `/proto/home`,
  AUTH: () => `/proto/auth`,
  DESK_EDIT: () => `/proto/new-desk-vocab`,
  REVIEW_FLASHCARD: () => `/proto/review/flashcard`,
  LIBRARY: () => `/proto/home/library`,
  PROFILE: (profileId?: string) =>
    profileId && profileId.length > 0
      ? `/proto/home/profile${profileId}`
      : `/proto/home/profile`,
};

export const {
  DASHBOARD_ROUTE,
  COLLECTION_DETAILS,
  COLLECTION_FINISH,
  COLLECTION_LEARN,
  COLLECTION_CREATE,
  COLLECTION_EDIT,
  SETTING,
  AUTH_SIGN_IN,
  AUTH_FORGOTPASSWORD,
  AUTH_SIGN_UP,
} = routeState;
