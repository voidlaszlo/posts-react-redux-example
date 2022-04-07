import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { currentUserSlice } from "../features/currentUserSlice";
import { api } from "../api/api";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (callback) => callback().concat(api.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
