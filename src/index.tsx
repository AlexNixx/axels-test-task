import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Routing } from './Routing';
import { store } from './redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
