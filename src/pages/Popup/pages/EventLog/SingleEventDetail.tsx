import {Box, Link, List, ListItemButton, ListItemIcon, Typography} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React from 'react';
import {ATEvent} from "../../../../global/types/entity/ATEvent";
import {displayedValue} from "../../../../global/utils";
import SingleEventValueText from "../../components/SingleEventValueText";
import env from "../../../../global/env";
import {green} from "@mui/material/colors";

type Props = {
    event: ATEvent,
    AId: string | undefined
}

const displayedAttributes = ['target', 'eventId', 'clickId', 'clientId', 'eventValue', 'currency',
     'link', 'brandName', 'transactionId', 'shippingPrice', 'taxPrice', 'items', 'cp']


const SingleEventArrayValue = (props: any) => {
    const {arrayValue} = props;
    return <List>
        {arrayValue
            .filter(Boolean)
            .map((value: any, index: number) =>
            <ListItemButton
                sx={{
                    px: 0
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: theme => theme.spacing(1.5)
                    }}
                >
                    <FiberManualRecordIcon
                        sx={{
                            fontSize: theme => theme.spacing(1),
                            color: green[400]
                        }}
                    />
                </ListItemIcon>
                <SingleEventValueText
                    key={value}
                    sx={{
                        mt: !index ? 0 : 0.5,
                    }}
                >
                    {displayedValue(value)}
                </SingleEventValueText>
            </ListItemButton>
        )
        }
    </List>
}

const getDisplayedValue = (props: Props, key: string, value: any) => {
    if (Array.isArray(value))
        return SingleEventArrayValue({arrayValue: value})

    if (key === 'clientId')
        return (
            <Link
                component="button"
                variant={"body2"}
                sx={{
                    fontSize: (theme) => theme.spacing(1.5),
                    lineHeight: (theme) => theme.spacing(2.25),
                    wordBreak: 'break-word',
                    color: 'unset'
                }}
                onClick={() => window.open(`https://dashboard.anytrack.io/events?aid=${props.AId}&query=${value}`)}
            >
                {displayedValue(value)}
            </Link>
        )

    return (
        <SingleEventValueText>
            {displayedValue(value)}
        </SingleEventValueText>
    )
}

const SingleEventDetail: React.FC<Props> = (props) => {
    const {event} = props
    return (
        <>
            {
                Object.keys(event)
                    .filter(attr => displayedAttributes.includes(attr) && event[attr as keyof ATEvent] !== env.DEFAULT_VALUE_AT_EVENT_ATTRIBUTE)
                    .map((key: string) => {
                        const value = event[key as keyof ATEvent]
                        return (
                            <Box
                                key={key}
                                sx={{
                                    my: 1
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: theme => theme.spacing(1.5),
                                        lineHeight: theme => theme.spacing(2),
                                        color: 'text.disabled',
                                        display: 'block',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {key}
                                </Typography>
                                {getDisplayedValue(props, key, value)}
                            </Box>
                        )
                    })
            }
        </>
    )
}

export default SingleEventDetail