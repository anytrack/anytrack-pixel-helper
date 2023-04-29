import React from 'react';
// @ts-ignore
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import {Button, Typography} from "@mui/material";
import {ATMessageType} from "../../global/entity/ATMessage";
import {ATEvent} from "../../global/entity/ATEvent";
import {getActiveTab} from "../../global/utils";

const Popup = () => {
    const [ATEventLog, setATEventLog] = React.useState<ATEvent[]>([])
    const getATEventLogFromContentScript = () => window.ATEventLog
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
                    func: getATEventLogFromContentScript
                })
                if (result.length) {
                    result[0].result.reverse();
                    setATEventLog(result[0].result)
                }
            } catch (_) {}
        })()
    },[])

    return (
        <div className="App">
            <header className="App-header">
                <Typography
                    variant={"h6"}
                >
                    AnyTrack Event Log
                </Typography>
                <Button
                    onClick={() => setATEventLog([])}
                    sx={{
                        color: 'red'
                    }}
                >
                    Clear events
                </Button>
                <ul>
                    {ATEventLog.reverse().map((event: ATEvent) => <li> {event.eventName + '-' + event.eventTime}</li>)}
                </ul>
            </header>
        </div>
    );
};

export default Popup;
