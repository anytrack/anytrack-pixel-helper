import {ListItem, ListItemIcon} from '@mui/material';
import React from 'react';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ListItemText from "../../components/ListItemText";
import {PixelNetwork, ScriptInitiator} from "../../../../global/types/entity/PixelNetwork";
import {getDisplayNameForPixelNetwork} from "../../../../global/utils/pixelNetwork";
import CodeBlock from "../../components/CodeBlock";

type Props = {
    scriptInitiator: ScriptInitiator,
    pixelNetwork: PixelNetwork,
    accountId: string
}

const Pixel: React.FC<Props> = ({scriptInitiator, pixelNetwork, accountId}) => {
    return (
        <ListItem
            sx={{
                pl: 1,
                py: 0,
                my: 0.5
            }}
        >
            <ListItemIcon
                sx={{
                    minWidth: theme => theme.spacing(1.5)
                }}
            >
                <CodeRoundedIcon
                    sx={{
                        fontSize: theme => theme.spacing(2),
                        mr: 1,
                    }}
                />
            </ListItemIcon>
            <ListItemText
                primary={getDisplayNameForPixelNetwork(pixelNetwork)}
                secondary={accountId}
                sx={{
                    '& pre': {
                        my: 0,
                        py: '0 !important'
                    },
                    wordWrap: 'break-word'
                }}
                secondaryTypographyProps={{
                    component: CodeBlock,
                    eventSnippet: accountId,
                }}
                primaryTypographyProps={{
                    ml: 0.5,
                    my: 0.5
                }}
            />
        </ListItem>
    )
}

export default Pixel;