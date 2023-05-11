import React from 'react';
import {Box, IconButton, List, ListSubheader} from "@mui/material";
import {ATEvent} from '../../../global/types/entity/ATEvent';
import SingleEvent from './SingleEvent';
// @ts-ignore
import ArrowIconImg from '../../../assets/img/ArrowIcon.png'

type Props = {
    ATEventLog: ATEvent[],
    AId: string
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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <ListSubheader
                    sx={{
                        pl: 1,
                        fontSize: '0.875rem',
                        lineHeight: '1.125rem',
                        cursor: 'pointer',
                        color: 'black',
                        fontWeight: 'bold'
                    }}
                >
                    {`Asset ID: ${AId}`}
                </ListSubheader>
                <IconButton
                    onClick={handleIconClick}
                >
                    <Box
                        component={"img"}
                        src={ArrowIconImg}
                        sx={{
                            width: theme => theme.spacing(2.5),
                            height: theme => theme.spacing(2.5)
                        }}
                    />
                </IconButton>
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