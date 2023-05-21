import {Box, Collapse, ListItemButton, ListItemIcon, Paper} from '@mui/material';
import React from 'react';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ListItemText from "../../components/ListItemText";
import CodeBlock from "../../components/CodeBlock";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

type Props = {
    eventSnippet: string,
    snippetIndex: number
}

const parseAnyTrackParameters = (eventSnippet: string) => {
    const matches = eventSnippet.match(/^AnyTrack\(['"](.+?)['"]\s*,\s*['"](.+?)['"]\s*,/)
    if (matches !== null)
        return [matches[1], matches[2]]
    return []
}

const SingleEventSnippet: React.FC<Props> = ({eventSnippet, snippetIndex}) => {
    const [open, setOpen] = React.useState(false);
    const parameters = parseAnyTrackParameters(eventSnippet)

    return (
        <Box
            component={Paper}
            sx={{
                mt: !snippetIndex ? 1 : 0
            }}
            elevation={open ? 1 : 0}
        >
            <ListItemButton
                onClick={() => setOpen(!open)}
                disableGutters={true}
                sx={{
                    pl: 0.5,
                    pr: 1
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: theme => theme.spacing(1.5)
                    }}
                >
                    <CodeRoundedIcon
                        color={"primary"}
                        sx={{
                            fontSize: '1rem',
                            mr: 1,
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={`${parameters[0]}, ${parameters[1]}`}
                    className={"text-truncate"}
                />
                {open ? <ExpandLess
                    sx={{ fontSize: '1.2rem' }}
                /> : <ExpandMore
                    sx={{ fontSize: '1.2rem' }}
                />}
            </ListItemButton>
            <Collapse
                in={open} unmountOnExit
                sx={{
                    '& pre': {
                        my: '0 !important'
                    },
                }}
                timeout={10}
            >
                <CodeBlock
                    eventSnippet={eventSnippet}
                />
            </Collapse>
        </Box>
    )
}

export default SingleEventSnippet;