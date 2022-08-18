import { createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
}

interface IUserState {
  isFetching: boolean;
  currentUser: User | null;
  error: boolean;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state: IUserState) => {
      state.isFetching = true;
    },
    loginSuccess: (state: IUserState, action: any) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state: IUserState) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
