import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userGQLApi } from "@/api/user service/graphql/user.graphql.api";
// Or from '@reduxjs/toolkit/query/react'
import ReviewFlashcardReducer from "./ReviewFlashcard.slice";
import CardNodeProtoReducer from "./CardNode.proto.slice";
import HomepgeProtoReducer from "./HomePage.proto.slice";
import NewDeskProtoReducer from "./newDesk.slice";
import LibraryProtoReducer from "./LibraryStore.slice";
import DeskProtoReducer from "./Desk.proto.slice";
import AuthProtoReducer from "./Auth.proto.slice";
const rootReducer = combineReducers({
  auth: AuthProtoReducer,
  CardNode: CardNodeProtoReducer,
  HomePage: HomepgeProtoReducer,
  NewDesk: NewDeskProtoReducer,
  ReviewFlashCard: ReviewFlashcardReducer,
  LibraryPage: LibraryProtoReducer,
  DeskPage: DeskProtoReducer,
});
import localStorage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  whitelist: ["auth"], // Specify which reducers should be persisted
  storage: localStorage, // You can use other storages like sessionStorage, AsyncStorage (for React Native), etc.
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const ProtoStore = configureStore({
  reducer: {
    persistedReducer,
    // persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userGQLApi.reducerPath]: userGQLApi.reducer,

    // // apiReducer,
  },
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, userApi.middleware, userGQLApi.middleware),
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(ProtoStore.dispatch);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootState = ReturnType<typeof ProtoStore.getState>;
export type AppDispatch = typeof ProtoStore.dispatch;
export type AppStore = typeof ProtoStore;

import { useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { auth } from "@/auth";
import { authApi } from "@/api/user service/authentication.api";
import { userApi } from "@/api/user service";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const persistor = persistStore(ProtoStore);
