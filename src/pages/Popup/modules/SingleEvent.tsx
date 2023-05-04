import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import React from 'react';
import {ATEvent} from "../../../global/entity/ATEvent";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import StarBorder from "@mui/icons-material/StarBorder";
import SingleEventDetail from "./SingleEventDetail";

type Props = {
    event: ATEvent
}
const SingleEvent: React.FC<Props> = ({event}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <ListItemButton
                onClick={() => setOpen(!open)}
                disableGutters={true}
                sx={{
                    px: 1
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: theme => theme.spacing(1.5)
                    }}
                >
                    <FiberManualRecordIcon
                        color={"success"}
                        sx={{
                            fontSize: '0.5rem',
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={event.eventName}
                    className={"text-truncate"}
                    sx={{
                        '& .MuiListItemText-primary': {
                            fontSize: '0.875rem',
                            lineHeight: 1.125
                        }
                    }}
                />
                {open ? <ExpandLess
                    sx={{ fontSize: '1.2rem' }}
                /> : <ExpandMore
                    sx={{ fontSize: '1.2rem' }}
                />}
            </ListItemButton>
            <Collapse
                in={open} timeout="auto" unmountOnExit
                sx={{
                    px: 2.5
                }}
            >
                <SingleEventDetail event={event}/>
            </Collapse>
        </>
    )
}

export default SingleEvent;