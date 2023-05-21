import * as React from 'react';
import { Typography, styled } from '@mui/material';

const SubHeader = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    lineHeight: '1.125rem',
    color: 'black',
    fontWeight: 'bold'
}));

export default SubHeader;