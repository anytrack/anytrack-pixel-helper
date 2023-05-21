import {Box, Collapse, ListItemButton, ListItemIcon, Paper} from '@mui/material';
import React from 'react';
import {ATEvent} from "../../../../global/types/entity/ATEvent";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import SingleEventDetail from "./SingleEventDetail";
import {grey} from '@mui/material/colors';
import {formatDate} from "../../../../global/utils";
import ListItemText from "../../components/ListItemText";
import CollapseController from "../../components/CollapseController";

type Props = {
    event: ATEvent,
    index: number
}
const SingleEventLog: React.FC<Props> = ({event, index}) => {
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
                        color={"primary"}
                        sx={{
                            fontSize: '0.5rem',
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
                <SingleEventDetail event={event}/>
            </Collapse>
        </Box>
    )
}

export default SingleEventLog;