import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { apiRequest } from "../helpers/requestMethods";

export const login = async (
  dispatch: Function,
  user: { username: string | undefined; password: string | undefined }
) => {
  dispatch(loginStart());
  console.log(user);
  try {
    const res = await apiRequest.post("/auth/login", {
      username: user.username,
      password: user.password,
    });
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
