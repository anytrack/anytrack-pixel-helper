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
                sx={{
                    maxHeight: props.page === PopupPage.Homepage ? '500px' : '470px',
                    overflowY: 'auto'
                }}
            >
                {props.children}
            </Box>
        </>
    );
};

export default HeaderLayout;




