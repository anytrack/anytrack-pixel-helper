import React from 'react';
import SubHeader from "../../components/SubHeader";
import {DisplayMessage} from "../../../../global/config";

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
            {`${DisplayMessage.noScriptFound} ${window.tabHostName}. Ad and tracking blockers can prevent pixel fires.`}
        </SubHeader>
    )
}

export default ScriptNotFound