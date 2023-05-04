import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './css/index.scss';
import {CssBaseline} from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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