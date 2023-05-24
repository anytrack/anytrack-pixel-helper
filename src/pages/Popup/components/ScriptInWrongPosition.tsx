import React from 'react';
import SubHeader from "../components/SubHeader";

const ScriptInWrongPosition = () => {
    return (
        <SubHeader
            sx={{
                pl: 1.5,
                pt: 1.5,
                fontWeight: 'normal'
            }}
        >
            Script outside the head tag detected. Please place the AnyTrack script as early as possible in the
        </SubHeader>
    )
}

export default ScriptInWrongPosition