import * as React from 'react';
import { Typography, styled } from '@mui/material';

const SubHeader = styled(Typography)(({ theme }) =>
    theme.unstable_sx({
        fontSize: theme.spacing(1.75),
        lineHeight: theme.spacing(2.5),
        color: 'black',
        fontWeight: 'bold'
    })
);

export default SubHeader;