import usersReducer, {
  followingInProgress,
  followUnfollowUserSuccess,
  IUsersState,
  requestUsers,
} from "./users-reducer";

const initialState: IUsersState = {
  users: [
    {
      followed: false,
      id: 221,
      name: "Dmitri",
      photos: {
        small: null,
        large: null,
      },
      status: "Status",
      uniqueUrlName: null,
    },
    {
      followed: false,
      id: 222,
      name: "Dmitri",
      photos: {
        small: null,
        large: null,
      },
      status: "Status",
      uniqueUrlName: null,
    },
  ],
  followingInProgress: [],
  isFetching: true,
  status: "",
  error: "",
  totalUsersCount: 0,
};

describe("user reducer sync actions", () => {
  it("should handle initial state ", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual({
      ...initialState,
      users: [],
    });
  });

  it("should add on following progress user id", () => {
    const actual = usersReducer(initialState, followingInProgress(221));
    expect(actual.followingInProgress.length).toEqual(1);
  });
  it("should follow/unfollow user, and clear progress", () => {
    const actual = usersReducer(initialState, followUnfollowUserSuccess(221));
    expect(actual.users[0].followed).toBeTruthy();
    expect(actual.users[1].followed).toBeFalsy();
    expect(actual.followingInProgress.length).toEqual(0);
  });
});

describe("user reducer async actions", () => {
  it("should empty Users array and set fetching to 'true' ", async () => {
    const action = {
      type: requestUsers.pending.type,
    };
    const state = usersReducer(initialState, action);
    expect(state.users.length).toEqual(0);
    expect(state.isFetching).toEqual(true);
  });

  const users = {
    items: [
      {
        userId: 221,
        fullName: "Dmitri",
        followed: false,
      },
      {
        userId: 222,
        fullName: "Dmitri",
        followed: false,
      },
    ],
    totalCount: 3,
  };

  it("should set fetching to 'false',set Users data to array and set number of received Users  ", async () => {
    const action = {
      type: requestUsers.fulfilled.type,
      payload: users,
    };
    const state = usersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      users: users.items,
      totalUsersCount: users.totalCount,
      isFetching: false,
    });
    expect(state.users.length).toEqual(2);
  });
});
