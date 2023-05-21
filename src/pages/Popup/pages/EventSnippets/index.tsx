import React from 'react';
import {Stack} from "@mui/material";
import SubHeader from "../../components/SubHeader";
import CodeBlock from '../../components/CodeBlock';

type Props = {
    eventSnippets: string[]
}

const EventSnippets: React.FC<Props> = ({ eventSnippets}) => {
    return (
        <>
            <SubHeader
                sx={{
                    ml: 1.5
                }}
            >
                {`Snippet on ${window.tabHostName}`}
            </SubHeader>
            <Stack
                sx={{
                    px: 1
                }}
                spacing={1}
            >
                {eventSnippets.map((eventSnippet, index) => (
                    <CodeBlock key={eventSnippet + index} eventSnippet={eventSnippet} />
                ))}
            </Stack>
        </>
    );
}

export default EventSnippets