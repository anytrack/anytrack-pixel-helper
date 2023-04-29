import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    window.document.querySelector('#app-container')
);

// @ts-ignore
if (module.hot) module.hot.accept();