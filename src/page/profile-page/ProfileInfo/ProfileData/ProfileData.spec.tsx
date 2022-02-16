import { screen } from "@testing-library/react";
import { ProfileData } from "./ProfileData";
import { renderWithStore } from "../../../../utils/test-utils/reduxStoreWrapper";
import { profileData } from "../../../../types/IProfileData";

const profile = {
  ...profileData,
  aboutMe: "Developer",
};

describe("ProfileData component renders", () => {
  it(" should render ProfileData component ", () => {
    renderWithStore(
      <ProfileData
        profile={profile}
        paramsUserId="2"
        setEditMode={jest.fn()}
      />,
      {}
    );
    expect(screen.getByText(/Developer/i)).toBeInTheDocument();
  });
});
