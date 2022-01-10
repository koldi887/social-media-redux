import { screen } from "@testing-library/react";
import ProfileInfoData from "./ProfileInfoData";
import { renderWithStore } from "../../../../utils/test-utils/reduxStoreWrapper";
import { profileData } from "../../../../types/IProfileData";

const profile = {
  ...profileData,
  aboutMe: "Developer",
};

describe("ProfileInfoData component renders", () => {
  it(" should render ProfileInfoData component ", () => {
    renderWithStore(
      <ProfileInfoData
        profile={profile}
        paramsUserId="2"
        setEditMode={jest.fn()}
      />,
      {}
    );
    expect(screen.getByText(/Developer/i)).toBeInTheDocument();
  });
});
