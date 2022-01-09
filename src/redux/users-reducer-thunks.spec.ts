import { usersAPI } from "../api/users-api";
import { IAPIResponse, ResultCodeEnum } from "../api/api";
import { followingInProgress, followUnfollowUser } from "./users-reducer";

jest.mock("../api/Users-api");
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userAPIMock.followUser.mockClear();
  userAPIMock.unfollowUser.mockClear();
});

const result: IAPIResponse<object> = {
  resultCode: ResultCodeEnum.success,
  messages: [],
  data: {},
};
userAPIMock.followUser.mockResolvedValue(Promise.resolve(result));
userAPIMock.unfollowUser.mockResolvedValue(Promise.resolve(result));

describe("user reducer thunks", () => {
  it("followUnfollowUser thunk ", async () => {
    const thunk = followUnfollowUser({ userId: 2, followed: true });
    thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toHaveBeenCalledWith(followingInProgress(2));
    expect(dispatchMock).toBeCalledTimes(2);
  });
});
