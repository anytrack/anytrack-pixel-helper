import * as React from 'react';
import { ListItemText as MuiListItemText, styled } from '@mui/material';

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        fontSize: 14,
        lineHeight: '18px'
    },
    '& .MuiListItemText-secondary': {
        fontSize: 13,
        lineHeight: '18px'
    }
}));

export default ListItemText;