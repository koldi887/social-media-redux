import authReducer, {
  setCaptchaUrl,
  setLoginErrors,
  authSuccess,
} from "./auth-reducer";
import { IAuthState } from "../../../types/IAuth";

const initialState: IAuthState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  avatar: null,
  captchaUrl: null,
  loginErrors: [],
};

describe("auth reducer sync actions", () => {
  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should set authorized user profile", () => {
    const value = {
      id: 222,
      email: "dmitri@mail.ru",
      login: "Dmitri",
      isAuth: true,
    };
    const actual = authReducer(initialState, authSuccess(value));
    expect(actual).toEqual({
      ...initialState,
      id: 222,
      email: "dmitri@mail.ru",
      login: "Dmitri",
      isAuth: true,
    });
  });
  it("should set captcha url", () => {
    const value = "captcha url";
    const actual = authReducer(initialState, setCaptchaUrl(value));
    expect(actual.captchaUrl).toEqual(value);
  });

  it("should set errors", () => {
    const value = "error";
    const actual = authReducer(initialState, setLoginErrors([value]));
    expect(actual.loginErrors).toEqual(value);
  });
});
