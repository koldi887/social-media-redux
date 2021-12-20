import React from "react";
import "./App.css";
import Container from "./page/components/container/Container";
import HeaderContainer from "./page/components/header/HeaderContainer";
import { Provider } from "react-redux";
import { setupStore } from "./redux/redux-store";
import { Login } from "./page/components/login/Login";
import { Route, Routes } from "react-router-dom";

const store = setupStore();

const App = () => {
  return (
      <Provider store={store}>
        <div>
          <HeaderContainer />
          <Routes>
            {/*<Route path="/" element={<Main />} />*/}
            {/*<Route path="/Profile" element={<Profile />}>*/}
            {/*  <Route path=":userId" />*/}
            {/*</Route>*/}
            {/*<Route path="/Dialogs" element={<DialogsContainer />} />*/}
            {/*<Route path="/Users" element={<UsersContainer />} />*/}
            {/*<Route path="/Music" element={<Music />} />*/}
            {/*<Route path="/Settings" element={<Settings />} />*/}
            <Route path="/login" element={<Login />} />
            {/*<Route path="/register" element={<Register />} />*/}
            {/*<Route path="*" element={<Navigate to="/" />} />*/}
          </Routes>
          {/*<Container />*/}
          {/*<Footer />*/}
        </div>
      </Provider>
  );
};

export default App;
