import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React from 'react';
import {ATEvent} from "../../../../global/types/entity/ATEvent";
import {displayedValue} from "../../../../global/utils";
import SingleEventValueText from "../../components/SingleEventValueText";
import env from "../../../../global/env";

type Props = {
    event: ATEvent
}

const displayedAttributes = ['target', 'eventId', 'clickId', 'clientId', 'eventValue', 'currency',
     'link', 'brandName', 'transactionId', 'shippingPrice', 'taxPrice', 'items']

const SingleEventArrayValue = (props: any) => {
    const {arrayValue} = props;
    return <List>
        {arrayValue
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
                            color: 'text.secondary'
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
const SingleEventDetail: React.FC<Props> = ({event}) => {
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
                                {Array.isArray(value) ? SingleEventArrayValue({arrayValue: value}) :
                                    <SingleEventValueText
                                        className={"text-truncate"}
                                    >
                                        {displayedValue(value)}
                                    </SingleEventValueText>
                                }
                            </Box>
                        )
                    })
            }
        </>
    )
}

export default SingleEventDetail