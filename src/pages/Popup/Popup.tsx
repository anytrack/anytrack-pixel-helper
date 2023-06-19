import React from 'react';
import {ATMessage, ATMessageType} from "../../global/types/entity/ATMessage";
import {ATEvent} from "../../global/types/entity/ATEvent";
import {getActiveTab} from "../../global/utils";
import {PopupPage} from "../../global/types/entity";
import PageRouter from "./pages";
import {PixelNetworkInfo} from "../../global/types/entity/PixelNetwork";
import InjectionResult = chrome.scripting.InjectionResult;

declare global {
    interface Window {
        pixelNetworkInfo: PixelNetworkInfo,
        // Whether the active tap of this popup window has been loaded (window.onload event fires)
        tabHostName: string,
        tabId: number
    }
}

const Popup = () => {
    const [page, setPage] = React.useState<PopupPage>(PopupPage.Homepage)
    const [AId, setAId] = React.useState<string | undefined>(undefined)
    const [eventSnippets, setEventSnippet] = React.useState<string[]>([])
    const [activeTabLoaded, setActiveTabLoaded] = React.useState<boolean>(false)

    const getDataFromActiveTab = () => ([window.pixelNetworkInfo, window.ATeventSnippets, window.location.hostname, window.loaded])

    React.useEffect(() => {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            switch (request.type) {
                case ATMessageType.SendActiveTabLoadedStateToPopup:
                    setActiveTabLoaded(true)
                    sendResponse({
                        type: ATMessageType.SendResponse
                    })
                    break;
                default:
            }
        });

        // Get AnyTrack, GTM, and script data from active tab of the extension Popup
        (async () => {
            const activeTab = await getActiveTab()
            if (!activeTab || !activeTab.id)
                return;
            window.tabId = activeTab.id
            try {
                const result = await chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: getDataFromActiveTab
                }) as InjectionResult<[PixelNetworkInfo & {Aid: string}, string[], string, boolean | undefined]>[]
                if (result.length) {
                    const temp = result[0].result
                    const {Aid, ...rest} = temp[0]
                    setAId(Aid)
                    window.pixelNetworkInfo = rest
                    setEventSnippet(temp[1])
                    window.tabHostName = temp[2]
                    setActiveTabLoaded(temp[3] || false)
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
            eventSnippets={eventSnippets}
            activeTabLoaded={activeTabLoaded}
            AId={AId}
        />
    );
};

export default Popup;




