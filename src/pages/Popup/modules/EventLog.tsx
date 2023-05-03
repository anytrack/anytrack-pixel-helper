import React from 'react';
import {List, ListSubheader} from "@mui/material";
import {ATEvent} from '../../../global/entity/ATEvent';
import SingleEvent from './SingleEvent';

type Props = {
    ATEventLog: ATEvent[]
}
const EventLog: React.FC<Props> = ({ATEventLog}) => {
    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            dense
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>
            }
        >
            {ATEventLog.map(event => {
                return <SingleEvent event={event} key={event.eventId}/>
            })}
        </List>
    );
}

export default EventLog