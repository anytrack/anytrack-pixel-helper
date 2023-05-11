import React from 'react';
// @ts-ignore
import logo from '../../../assets/img/logo-square.png';
import {Avatar, Box, Divider, Link, Typography} from "@mui/material";
import {PopupPage} from "../../../global/types/entity";

type Props = {
    setPage: React.Dispatch<PopupPage>,
    eventSnippets: string[]
}

const Header: React.FC<Props> = (props) => {
    const { setPage, eventSnippets } = props

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
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                right: 0
            }}>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => setPage(PopupPage.EventSnippets)}
                    sx={{
                        pr: 1.5,
                        pb: 0.75
                    }}
                >
                    {!eventSnippets.length ? 'No snippets' : `Snippets found ${eventSnippets.length}`}
                </Link>
            </Box>
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




