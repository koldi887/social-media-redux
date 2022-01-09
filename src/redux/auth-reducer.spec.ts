import authReducer, {
  IAuth,
  setCaptchaUrl,
  setErrors,
  setUserData,
} from "./auth-reducer";

const initialState: IAuth = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
  errors: {
    loginErrors: [],
  },
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
    const actual = authReducer(initialState, setUserData(value));
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
    const actual = authReducer(initialState, setErrors(value));
    expect(actual.errors.loginErrors).toEqual(value);
  });
});
