import React from 'react';
import SubHeader from "../components/SubHeader";
import {DisplayMessage} from "../../../global/config";

type Props = {

}

const ScriptInWrongPosition: React.FC<Props> = (props) => {
    return (
        <SubHeader
            sx={{
                pl: 1.5,
                pt: 1.5,
                fontWeight: 'normal'
            }}
        >
            {DisplayMessage.scriptInWrongPosition}
        </SubHeader>
    )
}

export default ScriptInWrongPosition