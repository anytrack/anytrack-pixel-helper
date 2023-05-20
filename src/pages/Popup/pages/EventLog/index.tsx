import React from 'react';
import {Box, IconButton, Link, List, Tooltip} from "@mui/material";
import {ATEvent} from '../../../../global/types/entity/ATEvent';
import SingleEvent from './SingleEvent';
import anyTrackLogo from '../../../../assets/img/logo-square.png'
import SubHeader from "../../components/SubHeader";
import ScriptInWrongPosition from "../../components/ScriptInWrongPosition";
import { getPixelScripts } from '../../../../global/utils/pixelNetwork';

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

const EventLog: React.FC<Props> = ({ATEventLog, AId}) => {
    const handleIconClick = () => {
        window.open(`https://dashboard.anytrack.io/asset/settings?aid=${AId}`)
    }
    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper', mt: 0.5, px: 0.5 }}
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
                    <SubHeader
                        sx={{
                            ml: 1
                        }}
                    >
                        {`Asset ID: ${AId}`}
                    </SubHeader>
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
                            >
                                <Box
                                    component={"img"}
                                    src={anyTrackLogo}
                                    sx={{
                                        width: theme => theme.spacing(2.5),
                                        height: theme => theme.spacing(2.5)
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Tooltip>
                </Box>
            </Box>
            }
        >
            {ATEventLog.map((event, index) => {
                return <SingleEvent event={event} key={event.eventId} index={index}/>
            })}
        </List>
    );
}

export default EventLog