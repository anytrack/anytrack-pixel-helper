import React from 'react';
import Header from "../components/Header";
import {Box} from "@mui/material";
import {PopupPage} from "../../../global/types/entity";

const HeaderLayout: React.FC<any> = (props) => {
    return (
        <>
            <Header
                {...props}
            />
            <Box
                className={props.page === PopupPage.Homepage ? 'content-home-page' : 'content'}
                sx={{
                    overflowY: 'auto'
                }}
            >
                {props.children}
            </Box>
        </>
    );
};

export default HeaderLayout;




