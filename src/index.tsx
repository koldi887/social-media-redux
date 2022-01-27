import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './redux/redux-store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/lib/persistStore';
import PreLoader from './page/components/common/Preloader/Preloader';

const store = setupStore();
const persistor = persistStore(store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      {/*<PersistGate loading={<PreLoader />} persistor={persistor}>*/}
      <App />
      {/*</PersistGate>*/}
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
