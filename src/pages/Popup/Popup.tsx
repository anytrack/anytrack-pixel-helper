import React from 'react';
// @ts-ignore
import logo from '../../assets/img/logo-square.png';
import {Avatar, Box, Divider, Typography} from "@mui/material";
import {ATMessageType} from "../../global/entity/ATMessage";
import {ATEvent} from "../../global/entity/ATEvent";
import {getActiveTab} from "../../global/utils";
import EventLog from './modules/EventLog';
import InjectionResult = chrome.scripting.InjectionResult;

const Popup = () => {
    const [ATEventLog, setATEventLog] = React.useState<ATEvent[]>([])
    const [AId, setAId] = React.useState('')
    const [eventSnippets, setEventSnippet] = React.useState([])
    const getATEventLogAndAIdFromContentScript = () => ([window.ATEventLog, window.AId, window.ATeventSnippets])

    React.useEffect(() => {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                if (request.type === ATMessageType.SendEventToPopup) {
                    setATEventLog(request.payload)
                    sendResponse({
                        type: ATMessageType.SendResponse
                    });
                }
            }
        );

        (async () => {
            const activeTab = await getActiveTab()
            if (!activeTab || !activeTab.id)
                return;
            try {
                const result = await chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: getATEventLogAndAIdFromContentScript
                }) as InjectionResult<[ATEvent[], string]>[]
                if (result.length) {
                    const temp = result[0].result
                    temp[0].reverse()
                    setATEventLog(temp[0])
                    setAId(temp[1])
                }
            } catch (_) {}
        })()
    },[])

    return (
        <>
            <Box
                sx={{
                    position: 'sticky',
                    zIndex: 100,
                    top: 0,
                    backgroundColor: 'white',
                    pt: 2.5
                }}
            >
                <Box
                    className={"header"}
                >
                    <Avatar
                        src={logo}
                        className={"logo"}
                    />
                    <Typography
                        variant={"body1"}
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        AnyTrack Pixel Helper
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        mt: 2
                    }}
                />
            </Box>
            <EventLog
                ATEventLog={ATEventLog}
                AId={AId}
            />
        </>
    );
};

export default Popup;




