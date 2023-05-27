import InjectionResult = chrome.scripting.InjectionResult;
import {ATMessageType} from "../../../global/types/entity/ATMessage";
import {setPopupIcon} from "../../../global/utils";

const getDataFromActiveTab = () => ([window.pixelNetworkInfo, window.loaded])

const handler = async (tabId: number) => {
    try {
        const result = await chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: getDataFromActiveTab
        }) as InjectionResult<[{Aid: string | undefined}, boolean | undefined]>[]
        if (result.length) {
            const temp = result[0].result
            const {Aid} = temp[0]
            const activeTabLoaded = temp[1]
            if (activeTabLoaded && Aid !== undefined) {
                setPopupIcon(tabId)
            }

        }
    } catch (_) {}
}

export const tabChangeHandler = () => {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch (request.type) {
            case ATMessageType.SendAnyTrackIdToServiceWorker:
                const { Aid } = request.payload
                if (Aid !== undefined)
                    setPopupIcon(sender.tab?.id)
                break;
            default:
        }
        sendResponse({
            type: ATMessageType.SendResponse
        })
    });

    chrome.tabs.onActivated.addListener(async function(activeInfo) {
        await handler(activeInfo.tabId)
    })

}