import {ListItem, ListItemIcon} from '@mui/material';
import React from 'react';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ListItemText from "../../components/ListItemText";
import {ScriptInfo} from "../../../../global/types/entity/PixelNetwork";
import {
    getAccountId,
    getDisplayNameForPixelNetwork,
    identifyPixelNetworkFromScript
} from "../../../../global/utils/pixelNetwork";
import CodeBlock from "../../components/CodeBlock";

type Props = {
    scriptInfo: ScriptInfo
}

const Pixel: React.FC<Props> = ({scriptInfo}) => {
    const pixelNetwork = identifyPixelNetworkFromScript(scriptInfo)
    const accountId = getAccountId(scriptInfo)

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
                secondary={accountId? accountId : scriptInfo.src}
                sx={{
                    '& pre': {
                        my: 0,
                        py: '0 !important'
                    },
                    wordWrap: 'break-word'
                }}
                secondaryTypographyProps={{
                    component: CodeBlock,
                    eventSnippet: accountId? accountId : scriptInfo.src
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