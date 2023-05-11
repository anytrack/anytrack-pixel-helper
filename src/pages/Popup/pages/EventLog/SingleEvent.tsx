import {Box, Collapse, ListItemButton, ListItemIcon, ListItemText, Paper} from '@mui/material';
import React from 'react';
import {ATEvent} from "../../../../global/types/entity/ATEvent";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import SingleEventDetail from "./SingleEventDetail";
import {grey} from '@mui/material/colors';
import {formatDate} from "../../../../global/utils";

type Props = {
    event: ATEvent,
    index: number
}
const SingleEvent: React.FC<Props> = ({event, index}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box
            component={Paper}
            sx={{
                backgroundColor: open ? grey[50] : '',
                mt: !index ? 1 : 0
            }}
            elevation={open ? 1 : 0}
        >
            <ListItemButton
                onClick={() => setOpen(!open)}
                disableGutters={true}
                sx={{
                    px: 1,
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
                    secondary={formatDate(event.eventTime)}
                    className={"text-truncate"}
                    sx={{
                        '& .MuiListItemText-primary': {
                            fontSize: 14,
                            lineHeight: '18px'
                        },
                        '& .MuiListItemText-secondary': {
                            fontSize: 13,
                            lineHeight: '18px'
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
                    px: 2.5,
                }}
            >
                <SingleEventDetail event={event}/>
            </Collapse>
        </Box>
    )
}

export default SingleEvent;