import React from 'react';
// @ts-ignore
import logo from '../../assets/img/logo-square.png';
import {ATMessage, ATMessageType} from "../../global/types/entity/ATMessage";
import {ATEvent} from "../../global/types/entity/ATEvent";
import {getActiveTab} from "../../global/utils";
import {PopupPage} from "../../global/types/entity";
import PageRouter from "./pages";
import InjectionResult = chrome.scripting.InjectionResult;

const Popup = () => {
    const [page, setPage] = React.useState<PopupPage>(PopupPage.Homepage)
    const [ATEventLog, setATEventLog] = React.useState<ATEvent[]>([])
    const [AId, setAId] = React.useState('')
    const [eventSnippets, setEventSnippet] = React.useState<string[]>([])
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

        // Todo: add comment
        (async () => {
            const activeTab = await getActiveTab()
            if (!activeTab || !activeTab.id)
                return;
            try {
                const result = await chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: getATEventLogAndAIdFromContentScript
                }) as InjectionResult<[ATEvent[], string, string[]]>[]
                if (result.length) {
                    const temp = result[0].result
                    temp[0].reverse()
                    setATEventLog(temp[0])
                    setAId(temp[1])
                    setEventSnippet(temp[2])
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
            AId={AId}
        />
    );
};

export default Popup;




