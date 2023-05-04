import { Box, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import React from 'react';
import {ATEvent} from "../../../global/entity/ATEvent";
import {displaydValue} from "../../../global/utils";

type Props = {
    event: ATEvent
}
const SingleEventDetail: React.FC<Props> = ({event}) => {
    return (
        <>
            {
                Object.keys(event)
                    .map((key: string) => (
                    <Box
                        key={key}
                        sx={{
                            my: 1
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme => theme.spacing(1.5),
                                lineHeight: '16px',
                                color: 'text.disabled',
                                display: 'block',
                                textTransform: 'capitalize'
                            }}
                        >
                            {key}
                        </Typography>
                        <Typography
                            className={"text-truncate"}
                            sx={{
                                fontSize: theme => theme.spacing(1.5),
                                lineHeight: '18px'
                            }}
                        >
                            {displaydValue(event[key as keyof ATEvent])}
                        </Typography>
                    </Box>
                ))
            }
        </>
    )
}

export default SingleEventDetail