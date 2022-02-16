import profileReducer, {
  addPostSuccess,
  getUserProfile,
  updateProfilePhoto,
  updateProfileStatus,
} from "./profile-reducer";
import { profileData, IProfileState } from "../../../types/IProfile";

const initialState: IProfileState = {
  posts: [
    {
      id: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      likesCount: 12,
    },
  ],
  profile: profileData,
  status: "",
  isFetching: false,
};

describe("profile reducer sync actions", () => {
  it("should handle initial state", () => {
    expect(profileReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should add new post", () => {
    const actual = profileReducer(
      initialState,
      addPostSuccess("new post text")
    );
    expect(actual.posts.length).toEqual(2);
  });
});

describe("profile reducer async actions", () => {
  it("should set user profile and status ", async () => {
    const user = {
      profileData: { ...profileData, userId: 2, fullName: "Dmitri K" },
      status: "new status",
    };

    const action = {
      type: getUserProfile.fulfilled.type,
      payload: user,
    };
    const state = profileReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      profile: user.profileData,
      status: user.status,
    });
  });

  it("should set new status  ", () => {
    const newStatus = "new status text";
    const action = {
      type: updateProfileStatus.fulfilled.type,
      payload: newStatus,
    };
    const state = profileReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: newStatus,
    });
  });

  it("should set isFetching to 'true'", () => {
    const action = {
      type: updateProfilePhoto.pending.type,
    };
    const state = profileReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isFetching: true,
    });
  });

  it("should set new photo and isFetching to 'false", async () => {
    const newPhoto = {
      small:
        "https://social-network.samuraijs.com/activecontent/images/users/17561/user-small.jpg?v=19",
      large:
        "https://social-network.samuraijs.com/activecontent/images/users/17561/user.jpg?v=19",
    };

    const action = {
      type: updateProfilePhoto.fulfilled.type,
      payload: newPhoto,
    };

    const state = profileReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      profile: { ...profileData, photos: newPhoto },
      isFetching: false,
    });
  });
});
