import React from 'react';
import {Stack} from "@mui/material";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {githubGist} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SubHeader from "../../components/SubHeader";

type Props = {
    eventSnippets: string[]
}

const CodeBlock = (props: any) => {
    return (
        <SyntaxHighlighter language="javascript" style={githubGist}>
            {props.eventSnippet}
        </SyntaxHighlighter>
    );
}


const EventSnippets: React.FC<Props> = ({ eventSnippets}) => {
    return (
        <>
            <SubHeader>
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