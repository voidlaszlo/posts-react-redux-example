import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import User from "../models/User";

interface CurrentUserState {
  user: User | null;
}

const initialState: CurrentUserState = {
  user: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export const selectCurrentUser = (state: RootState) => state.currentUser.user;