import * as React from 'react';
import {ListItemText as MuiListItemText, styled} from '@mui/material';

const ListItemText = styled(MuiListItemText)(({ theme }) =>
    theme.unstable_sx({
        '& .MuiListItemText-primary': {
            fontSize: theme.spacing(1.75),
            lineHeight: theme.spacing(2.25)
        },
        '& .MuiListItemText-secondary': {
            fontSize: theme.spacing(1.625),
            lineHeight: theme.spacing(2.25)
        }
    })
)


export default ListItemText;