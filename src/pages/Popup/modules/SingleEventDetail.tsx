import {Box, Typography} from '@mui/material';
import React from 'react';
import {ATEvent} from "../../../global/entity/ATEvent";
import {displayedValue} from "../../../global/utils";

type Props = {
    event: ATEvent
}

const displayedAttributes = ['target', 'eventId', 'clickId', 'clientId', 'eventName', 'eventValue', 'currency',
    'trackingGroup', 'link', 'brandName', 'transactionId', 'shippingPrice', 'taxPrice', 'items']
const SingleEventDetail: React.FC<Props> = ({event}) => {
    return (
        <>
            {
                Object.keys(event)
                    .filter(attr => displayedAttributes.includes(attr))
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
                            {displayedValue(event[key as keyof ATEvent])}
                        </Typography>
                    </Box>
                ))
            }
        </>
    )
}

export default SingleEventDetail