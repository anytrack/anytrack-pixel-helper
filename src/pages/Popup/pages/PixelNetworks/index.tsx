import React from 'react';
import {List} from "@mui/material";
import SubHeader from "../../components/SubHeader";
import {
    getAccountId,
    getPixelScripts,
    identifyPixelNetworkFromScript,
    identifyScriptInitiatorFromScript
} from "../../../../global/utils/pixelNetwork";
import Pixel from "./Pixel";
import {PixelNetworkInfo} from "../../../../global/types/entity/PixelNetwork";

type Props = {
}

const PixelNetworks: React.FC<Props> = ({}) => {
    const scripts = getPixelScripts(window)
        .map(scriptInfo => {
            const pixelNetwork = identifyPixelNetworkFromScript(scriptInfo)
            return {
                scriptInitiator: identifyScriptInitiatorFromScript(scriptInfo, window.pixelNetworkInfo as PixelNetworkInfo),
                pixelNetwork,
                accountId: `${getAccountId(scriptInfo)}`
            }
        })

    return (
        <>
            <SubHeader
                sx={{
                    ml: 1.5
                }}
            >
                {`Pixels on ${window.tabHostName}`}
            </SubHeader>
            <List
                sx={{
                }}
            >
                {scripts.map((scriptAttrs, index) => (
                    <Pixel
                        key={scriptAttrs.accountId + index}
                        {...scriptAttrs}
                    />
                ))}
            </List>
        </>
    );
}

export default PixelNetworks