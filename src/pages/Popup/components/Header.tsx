import React from 'react';
import logo from '../../../assets/img/logo-square.png';
import {Avatar, Box, Divider, IconButton, Link, Typography} from "@mui/material";
import {PopupPage} from "../../../global/types/entity";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

type Props = {
    page: PopupPage,
    setPage: React.Dispatch<PopupPage>,
    eventSnippets: string[]
}

const GoBackNavigation: React.FC<Props> = (props) => {
    const handleClick = () => props.setPage(PopupPage.Homepage)
    return (
        <Box
            onClick={handleClick}
            sx={{
                display: 'flex',
                cursor: 'pointer',
                my: 1.5,
                ml: 1
            }}
        >
            <KeyboardDoubleArrowLeftIcon
                color={"primary"}
            />
            <Link
                component="button"
                variant="body2"
                sx={{
                    ml: 0.5
                }}
            >
                Go back
            </Link>
        </Box>
    )
}

const Header: React.FC<Props> = (props) => {
    const { page, setPage, eventSnippets } = props
    const shouldShowGoBackNavigation = page !== PopupPage.Homepage
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
                bottom: theme => shouldShowGoBackNavigation ? theme.spacing(4.5) : 0,
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
            {shouldShowGoBackNavigation && <GoBackNavigation {...props} />}
        </Box>
    );
};

export default Header;




