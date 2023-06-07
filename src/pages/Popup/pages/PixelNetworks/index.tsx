import React from 'react';
import {List} from "@mui/material";
import SubHeader from "../../components/SubHeader";
import {getPixelScripts} from "../../../../global/utils/pixelNetwork";
import Pixel from "./Pixel";


const PixelNetworks = () => {
    const scripts = getPixelScripts(window)

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
                {scripts.map((scriptInfo, index) => (
                    <Pixel
                        key={scriptInfo.src + index}
                        scriptInfo={scriptInfo}
                    />
                ))}
            </List>
        </>
    );
}

export default PixelNetworks