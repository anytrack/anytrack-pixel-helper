import {Box, Collapse, ListItemButton, ListItemIcon, Paper} from '@mui/material';
import React from 'react';
import {ATEvent} from "../../../../global/types/entity/ATEvent";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SingleEventDetail from "./SingleEventDetail";
import {green, grey} from '@mui/material/colors';
import {formatDate} from "../../../../global/utils";
import ListItemText from "../../components/ListItemText";
import CollapseController from "../../components/CollapseController";

type Props = {
    event: ATEvent,
    index: number,
    AId: string | undefined
}
const SingleEventLog: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false);
    const {event, index} = props;
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
                        sx={{
                            fontSize: theme => theme.spacing(1),
                            color: green[400]
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={event.eventName}
                    secondary={formatDate(event.eventTime)}
                    className={"text-truncate"}
                />
               <CollapseController open={open} />
            </ListItemButton>
            <Collapse
                in={open} unmountOnExit
                sx={{
                    px: 2.5,
                }}
                timeout={10}
            >
                <SingleEventDetail {...props}/>
            </Collapse>
        </Box>
    )
}

export default SingleEventLog;