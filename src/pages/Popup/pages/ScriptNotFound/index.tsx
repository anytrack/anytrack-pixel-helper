import React from 'react';
import SubHeader from "../../components/SubHeader";

type Props = {

}

const ScriptNotFound: React.FC<Props> = (props) => {
    return (
        <SubHeader
            sx={{
                pl: 1.5,
                py: 1.5,
                fontWeight: 'normal'
            }}
        >
            {`No scripts were found on ${window.tabHostName}. Ad and tracking blockers can prevent pixel fires.`}
        </SubHeader>
    )
}

export default ScriptNotFound