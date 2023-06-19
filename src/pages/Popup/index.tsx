import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Popup from './Popup';
import './css/index.scss';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import {instantiateGlobalStore} from "../../global/store";


const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
    }
});

(async () => {
    const store = await instantiateGlobalStore();
    render(
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <Popup />
                    </CssBaseline>
                </ThemeProvider>
            </Provider>
        </React.StrictMode>,
        window.document.querySelector('#app-container')
    );
})()


// @ts-ignore
if (module.hot) module.hot.accept();