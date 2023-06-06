import React from 'react';
import {Box, IconButton, Link, List, Paper, Tooltip, Typography} from "@mui/material";
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import SingleEventLog from './SingleEventLog';
import SubHeader from "../../components/SubHeader";
import ScriptInWrongPosition from "../../components/ScriptInWrongPosition";
import {getPixelScripts} from '../../../../global/utils/pixelNetwork';
import {grey} from "@mui/material/colors";
import {useAppSelector} from "../../../../global/store/hook";
import {getATEventLogSelector} from "../../../../global/utils";

type Props = {
    AId: string | undefined
}

const isAnyTrackScriptInHead = () => {
    const anyTrackInitScript = getPixelScripts(window)
        .find(script => typeof script.src === 'string' && script.src.startsWith(`https://assets.anytrack.dev/scripts/v0/`))
    // This function only run when anyTrackNotInstalled function returns false, thus there exists anyTrack script
    // so the check in the following line should never happen
    if (!anyTrackInitScript)
        return true;

    return anyTrackInitScript?.inHeadTag
}

const EmptyEventsPlaceHolder = () => {
    return (
        <Box
            component={Paper}
            sx={{
                py: 3,
                backgroundColor: `${grey[50]}`
            }}
        >
            <Typography
                className={"content-text"}
                sx={{
                    textAlign: 'center',
                }}
            >
                No events recorded yet.
            </Typography>
        </Box>
    )
}

const EventLog: React.FC<Props> = ({AId}) => {
    const atEventLog = useAppSelector(getATEventLogSelector(window))

    const handleIconClick = () => {
        window.open(`https://dashboard.anytrack.io/?aid=${AId}`)
    }
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper', mt: 0.5, px: 0.5,
                pb: !atEventLog.length ? 0 : 1
            }}
            dense
            subheader={
                <Box>
                    {isAnyTrackScriptInHead() ? <></> : <ScriptInWrongPosition/>}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => {navigator.clipboard.writeText(AId || 'undefined').catch(console.error)}}
                        >
                            <SubHeader
                                sx={{
                                    ml: 1,
                                    cursor: 'pointer'
                                }}
                            >
                                {`Property ID: ${AId}`}
                            </SubHeader>
                            <IconButton
                                color={"primary"}
                                sx={{
                                    pl: 0.5,
                                    mb: 0.5
                                }}
                            >
                                <ContentCopyRoundedIcon
                                    sx={{
                                        fontSize: theme => theme.spacing(1.5)
                                    }}
                                />
                            </IconButton>
                        </Box>
                        <Tooltip
                            title={"View on AnyTrack"}
                            placement={"left"}
                        >
                            <Box
                                onClick={handleIconClick}
                                sx={{
                                    display: 'flex'
                                }}
                            >
                                <Link
                                    component="button"
                                    variant={"body2"}
                                    className={"header__link"}
                                    underline={"none"}
                                >
                                    Open
                                </Link>
                                <IconButton
                                    color="primary"
                                >
                                    <ArrowOutwardRoundedIcon
                                        sx={{
                                            fontSize: theme => theme.spacing(2.5)
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            }
        >
            {!atEventLog.length ? <EmptyEventsPlaceHolder/> :
                atEventLog.map((event, index) => {
                    return <SingleEventLog
                        event={event}
                        AId={AId}
                        key={event.eventId}
                        index={index}
                    />
                })}
        </List>
    );
}

export default EventLog