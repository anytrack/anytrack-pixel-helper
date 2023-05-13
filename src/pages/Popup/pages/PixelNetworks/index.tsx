import React from 'react';
import {List} from "@mui/material";
import SubHeader from "../../components/SubHeader";
import {
    getPixelScripts,
    identifyPixelNetworkFromScript,
    identifyScriptInitiatorFromScript
} from "../../../../global/utils/pixelNetwork";
import Pixel from "./Pixel";
import {PixelNetworkInfo} from "../../../../global/types/entity/PixelNetwork";
import {generateHash} from "../../../../global/utils";

type Props = {
}

const PixelNetworks: React.FC<Props> = ({}) => {
    const scripts = getPixelScripts(window)
        .map(scriptInfo => ({
            scriptInitiator: identifyScriptInitiatorFromScript(scriptInfo, window.pixelNetworkInfo as PixelNetworkInfo),
            pixelNetwork: identifyPixelNetworkFromScript(scriptInfo),
            accountId: `ID: A temporary Random value ${generateHash(20)}`,
        }))

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