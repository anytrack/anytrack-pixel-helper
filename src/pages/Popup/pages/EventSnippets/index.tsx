import React from 'react';
import {Stack} from "@mui/material";
import SubHeader from "../../components/SubHeader";
import SingleEventSnippet from "./SingleEventSnippet";

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
                {`Snippets on ${window.tabHostName}`}
            </SubHeader>
            <Stack
                sx={{
                    px: 1,
                    pb: 1.5
                }}
                spacing={1}
            >
                {eventSnippets.map((eventSnippet, index) => (
                    <SingleEventSnippet
                        key={eventSnippet + index} eventSnippet={eventSnippet}
                        snippetIndex={index}
                    />
                ))}
            </Stack>
        </>
    );
}

export default EventSnippets