import React from 'react';
// @ts-ignore
import logo from '../../../assets/img/logo-square.png';
import Header from "../components/Header";

const HeaderLayout = (props: any) => {
    return (
        <>
            <Header/>
            {props.children}
        </>
    );
};

export default HeaderLayout;




