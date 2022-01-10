import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { rootReducer, RootState } from "../../redux/redux-store";
import { configureStore } from "@reduxjs/toolkit";

const testStore = (state: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: state,
  });
};

export const renderWithStore = (component: ReactElement, InitialState: any) => {
  // @ts-ignore
  const Wrapper = ({ children }) => (
    <Provider store={testStore(InitialState)}>{children}</Provider>
  );
  return render(component, { wrapper: Wrapper });
};
