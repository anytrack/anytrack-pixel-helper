import React from 'react';
import {Alert} from "@mui/material";

const ScriptInWrongPosition = () => {
    return (
        <Alert
            severity={"warning"}
            variant={"outlined"}
            sx={{
                fontSize: theme => theme.spacing(1.75),
                lineHeight: theme => theme.spacing(2.5),
                px: 1,
            }}
        >
            Script outside the head tag detected. Please place the AnyTrack script as early as possible in the
        </Alert>
    )
}

export default ScriptInWrongPosition