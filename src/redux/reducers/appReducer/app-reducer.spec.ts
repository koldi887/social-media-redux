import app, { initializedSuccess } from "./app-reducer";
import appReducer from "./app-reducer";

let initialState = {
  initialized: false,
  error: null
};

describe("app reducer sync actions", () => {
  it("should handle initial state", () => {
    expect(app(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should change  initialized to 'true", () => {
    const actual = appReducer(initialState, initializedSuccess());
    expect(actual).toEqual({
      ...initialState,
      initialized: true,
    });
  });
});
