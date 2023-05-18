import React from 'react';
// @ts-ignore
import logo from '../../assets/img/logo-square.png';
import {ATMessage, ATMessageType} from "../../global/types/entity/ATMessage";
import {ATEvent} from "../../global/types/entity/ATEvent";
import {getActiveTab} from "../../global/utils";
import {PopupPage} from "../../global/types/entity";
import PageRouter from "./pages";
import InjectionResult = chrome.scripting.InjectionResult;
import {PixelNetworkInfo} from "../../global/types/entity/PixelNetwork";

declare global {
    interface Window {
        pixelNetworkInfo: PixelNetworkInfo,
        // Whether the active tap of this popup window has been loaded (window.onload event fires)
        tabHostName: string,
    }
}

const Popup = () => {
    const [page, setPage] = React.useState<PopupPage>(PopupPage.Homepage)
    const [ATEventLog, setATEventLog] = React.useState<ATEvent[]>([])
    const [AId, setAId] = React.useState<string | undefined>(undefined)
    const [eventSnippets, setEventSnippet] = React.useState<string[]>([])
    const [activeTabLoaded, setActiveTabLoaded] = React.useState<boolean>(false)

    const getATEventLogAndAIdFromContentScript = () => ([window.ATEventLog, window.pixelNetworkInfo, window.ATeventSnippets, window.location.hostname, window.loaded])

    React.useEffect(() => {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            switch (request.type) {
                case ATMessageType.SendEventToPopup:
                    setATEventLog(request.payload)
                    sendResponse({
                        type: ATMessageType.SendResponse
                    })
                    break;
                case ATMessageType.SendActiveTabLoadedStateToPopup:
                    setActiveTabLoaded(true)
                    sendResponse({
                        type: ATMessageType.SendResponse
                    })
                    break;
                default:
            }
        });

        // Todo: add comment
        (async () => {
            const activeTab = await getActiveTab()
            if (!activeTab || !activeTab.id)
                return;
            try {
                const result = await chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: getATEventLogAndAIdFromContentScript
                }) as InjectionResult<[ATEvent[], PixelNetworkInfo & {Aid: string}, string[], string, boolean | undefined]>[]
                if (result.length) {
                    console.log("result", result)
                    const temp = result[0].result
                    temp[0].reverse()
                    setATEventLog(temp[0])
                    const {Aid, ...rest} = temp[1]
                    setAId(Aid)
                    window.pixelNetworkInfo = rest
                    setEventSnippet(temp[2])
                    window.tabHostName = temp[3]
                    setActiveTabLoaded(temp[4] || false)
                }
            } catch (_) {}
        })();

        // Send GA4 page_view to service worker page
        (async () => {
            await chrome.runtime.sendMessage({
                type: ATMessageType.SendGA4Event,
                payload: {
                    name: 'page_view'
                }
            } as ATMessage)
        })();
    },[])

    return (
        <PageRouter
            page={page}
            setPage={setPage}
            ATEventLog={ATEventLog}
            eventSnippets={eventSnippets}
            activeTabLoaded={activeTabLoaded}
            AId={AId}
        />
    );
};

export default Popup;




