import {Chip, ListItem, ListItemIcon, Tooltip} from '@mui/material';
import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ListItemText from "../../components/ListItemText";
import {PixelNetwork, ScriptInitiator} from "../../../../global/types/entity/PixelNetwork";
import {getDisplayNameForPixelNetwork} from "../../../../global/utils/pixelNetwork";

type Props = {
    scriptInitiator: ScriptInitiator,
    pixelNetwork: PixelNetwork,
    accountId: string
}

const Pixel: React.FC<Props> = ({scriptInitiator, pixelNetwork, accountId}) => {
    return (
        <ListItem>
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
                primary={getDisplayNameForPixelNetwork(pixelNetwork)}
                secondary={accountId}
                className={"text-truncate"}
            />
            {scriptInitiator !== ScriptInitiator.AnyTrack ?
                <Tooltip
                    title={"AnyTrack automatically installs pixels on your website. Please remove pixel code from this page to avoid event duplication."}>
                    <Chip
                        label={scriptInitiator}
                        size={"small"}
                        color={"warning"}
                    />
                </Tooltip> : <Chip
                    label={scriptInitiator}
                    size={"small"}
                    color={"primary"}
                />
            }
        </ListItem>
    )
}

export default Pixel;