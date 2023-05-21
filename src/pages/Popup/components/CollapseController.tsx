import React from 'react';
import {ExpandLess, ExpandMore} from "@mui/icons-material";

type Props = {
    open: boolean
}

const CollapseController: React.FC<Props> = (props) => {
    return props.open ? <ExpandLess
        sx={{ fontSize: '1.2rem' }}
    /> : <ExpandMore
        sx={{ fontSize: '1.2rem' }}
    />
}

export default CollapseController