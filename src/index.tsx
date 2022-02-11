import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HistoryRouter as Router} from "redux-first-history/rr6";
import App from './App';
import {Provider} from 'react-redux';
import store, {history} from "./redux/redux-store";

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
