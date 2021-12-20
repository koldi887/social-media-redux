import React from "react";
// import profileSlice, {
//   getUserProfile,
//   updateUserStatus,
//   addNewPost,
// } from "./profile-reducer";

let state = {
  posts: [
    {
      id: 0,
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      likesCount: 12,
    },
  ],
  profile: null,
  status: "",
};

// describe("Test profile reducer", () => {
//   it("Thunk should get profile/status and set it to state ", function () {
//     let action = getUserProfile.fulfilled({
//       profileData: {},
//       status: "New status",
//     });
//     let newState = profileSlice(state, action);
//     expect(newState.profile).not.toBeNull();
//     expect(newState.status).toBe("New status");
//   });
//
//   it("New post should be added", function () {
//     let action = addNewPost("Dima");
//     let newState = profileSlice(state, action);
//     expect(newState.posts.length).toBe(2);
//     expect(newState.posts[1].text).toBe("Dima");
//     expect(newState.posts[1].likesCount).toBe(0);
//   });
//
//   it("Thunk should update status ", function () {
//     let action = updateUserStatus.fulfilled("New status");
//     let newState = profileSlice(state, action);
//     expect(newState.status).toBe("New status");
//   });
// });
