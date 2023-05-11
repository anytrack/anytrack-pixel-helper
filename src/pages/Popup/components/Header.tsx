import React from 'react';
// @ts-ignore
import logo from '../../../assets/img/logo-square.png';
import {Avatar, Box, Divider, Typography} from "@mui/material";

const Header = () => {
    return (
        <Box
            sx={{
                position: 'sticky',
                zIndex: 100,
                top: 0,
                backgroundColor: 'white',
                pt: 2.5
            }}
        >
            <Box
                className={"header"}
            >
                <Avatar
                    src={logo}
                    className={"logo"}
                />
                <Typography
                    variant={"body1"}
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    AnyTrack Pixel Helper
                </Typography>
            </Box>
            <Divider
                sx={{
                    mt: 2
                }}
            />
        </Box>
    );
};

export default Header;




