import React from 'react';
import {Box, IconButton, Link, List, Paper, Tooltip, Typography} from "@mui/material";
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import {ATEvent} from '../../../../global/types/entity/ATEvent';
import SingleEventLog from './SingleEventLog';
import SubHeader from "../../components/SubHeader";
import ScriptInWrongPosition from "../../components/ScriptInWrongPosition";
import { getPixelScripts } from '../../../../global/utils/pixelNetwork';
import {grey} from "@mui/material/colors";

type Props = {
    ATEventLog: ATEvent[],
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

const EventLog: React.FC<Props> = ({ATEventLog, AId}) => {
    const handleIconClick = () => {
        window.open(`https://dashboard.anytrack.io/asset/settings?aid=${AId}`)
    }
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper', mt: 0.5, px: 0.5,
                pb: !ATEventLog.length ? 0 : 1
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
                            onClick={() => {navigator.clipboard.writeText(AId || 'undefined').catch(console.log)}}
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
                                        fontSize: '0.75rem'
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
                                    Open in
                                </Link>
                                <IconButton
                                    color="primary"
                                >
                                    <ArrowOutwardRoundedIcon
                                        sx={{
                                            fontSize: '1.25rem'
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            }
        >
            {!ATEventLog.length ? <EmptyEventsPlaceHolder/> :
                ATEventLog.map((event, index) => {
                    return <SingleEventLog event={event} key={event.eventId} index={index}/>
                })}
        </List>
    );
}

export default EventLog