import { screen } from "@testing-library/react";
import ProfileStatus from "./ProfileStatus";
import { renderWithStore } from "../../../../utils/test-utils/reduxStoreWrapper";

describe("ProfileStatus component", () => {
  it(" should render ProfileStatus component ", () => {
    renderWithStore(<ProfileStatus setStatusToggle={jest.fn()} />, {});
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
});
