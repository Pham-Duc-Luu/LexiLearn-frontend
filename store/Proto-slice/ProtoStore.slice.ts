import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

// Or from '@reduxjs/toolkit/query/react'
import ReviewFlashcardReducer from "./ReviewFlashcard.slice";
import CardNodeProtoReducer from "./CardNode.proto.slice";
import HomepgeProtoReducer from "./HomePage.proto.slice";
import NewDeskProtoReducer from "./newDesk.slice";
import LibraryProtoReducer from "./LibraryStore.slice";

export const ProtoStore = configureStore({
  reducer: {
    // persistedReducer,
    CardNode: CardNodeProtoReducer,
    HomePage: HomepgeProtoReducer,
    NewDesk: NewDeskProtoReducer,
    ReviewFlashCard: ReviewFlashcardReducer,
    LibraryPage: LibraryProtoReducer,
    // // apiReducer,
  },
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootState = ReturnType<typeof ProtoStore.getState>;
export type AppDispatch = typeof ProtoStore.dispatch;
export type AppStore = typeof ProtoStore;

import { useDispatch, useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// export const persistor = persistStore(store);
