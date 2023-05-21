import InjectionResult = chrome.scripting.InjectionResult;
import {ATMessageType} from "../../../global/types/entity/ATMessage";

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
            if (activeTabLoaded && Aid === undefined) {
                chrome.action.setIcon({
                    tabId,
                    path: "logo-square-grey-128.png",
                })
            }

        }
    } catch (_) {}
}

export const tabChangeHandler = () => {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(request)
        switch (request.type) {
            case ATMessageType.SendActiveTabLoadedStateToBackground:
                const { Aid } = request.payload
                if (Aid === undefined)
                    chrome.action.setIcon({
                        tabId: sender.tab?.id,
                        path: "logo-square-grey-128.png",
                    })
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