import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../model/useAuthModel";

interface InitialState {
  chefUser: IUser;
  isLoggedIn: boolean;
  token: string | undefined;
}

const initialState: InitialState = {
  chefUser: {},
  isLoggedIn: false,
  token: undefined,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setChefUser: (
      state: InitialState,
      action: {
        payload: IUser;
      }
    ) => {
      state.chefUser = action.payload;
    },

    setIsLoggedIn: (
      state: InitialState,
      action: { payload: { loggedIn: boolean } }
    ) => {
      state.isLoggedIn = action.payload.loggedIn;
    },
    setToken: (state: InitialState, action: { payload: { token: string } }) => {
      state.token = action.payload.token;
    },
  },
});

export const { setChefUser, setIsLoggedIn, setToken } = authSlice.actions;

export const selectChefUser = (state: { userAuth: InitialState }) =>
  state.userAuth.chefUser;
export const selectIsLoggedIn = (state: { userAuth: InitialState }) =>
  state.userAuth.isLoggedIn;
export const selectToken = (state: { userAuth: InitialState }) =>
  state.userAuth.token;
export default authSlice.reducer;
