import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './css/index.scss';
import {CssBaseline} from "@mui/material";

render(
    <React.StrictMode>
        <CssBaseline>
            <Popup />
        </CssBaseline>
    </React.StrictMode>,
    window.document.querySelector('#app-container')
);

// @ts-ignore
if (module.hot) module.hot.accept();