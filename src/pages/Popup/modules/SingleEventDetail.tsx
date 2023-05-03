import { Box, Typography } from '@mui/material';
import React from 'react';
import {ATEvent} from "../../../global/entity/ATEvent";

type Props = {
    event: ATEvent
}
const SingleEventDetail: React.FC<Props> = ({event}) => {
    return (
        <Box>
            {
                Object.keys(event).map((key: string) => (
                    <Box
                        sx={{
                            display: 'flex'
                        }}
                        key={key}
                    >
                        <Typography
                            variant={"caption"}
                        >
                            {key}
                        </Typography>
                        <Typography
                            variant={"body2"}
                        >
                            {JSON.stringify(event[key as keyof ATEvent])}
                        </Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

export default SingleEventDetail