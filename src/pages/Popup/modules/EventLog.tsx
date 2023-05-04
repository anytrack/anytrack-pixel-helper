import React from 'react';
import {List, ListSubheader} from "@mui/material";
import {ATEvent} from '../../../global/entity/ATEvent';
import SingleEvent from './SingleEvent';

type Props = {
    ATEventLog: ATEvent[],
    AId: string
}
const EventLog: React.FC<Props> = ({ATEventLog, AId}) => {
    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper', mt: 1.5 }}
            dense
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader
                    sx={{
                        fontSize: '0.875rem',
                        lineHeight: '1.125rem',
                        cursor: 'pointer',
                        pl: 1,
                        color: 'black',
                        fontWeight: 'bold'
                    }}
                >
                    {`Asset ID: ${AId}`}
                </ListSubheader>
            }
        >
            {ATEventLog.map((event, index) => {
                return <SingleEvent event={event} key={event.eventId} index={index}/>
            })}
        </List>
    );
}

export default EventLog