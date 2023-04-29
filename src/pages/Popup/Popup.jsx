import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import {Typography} from "@mui/material";

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography
            variant={"body1"}
        >
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </Typography>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
    </div>
  );
};

export default Popup;
