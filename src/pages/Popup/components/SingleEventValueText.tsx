import * as React from 'react';
import { Typography, styled } from '@mui/material';

const SingleEventValueText = styled(Typography)(({ theme }) =>
    theme.unstable_sx({
        fontSize: theme.spacing(1.5),
        lineHeight: theme.spacing(2.25),
        wordBreak: 'break-word'
    })
);

export default SingleEventValueText;