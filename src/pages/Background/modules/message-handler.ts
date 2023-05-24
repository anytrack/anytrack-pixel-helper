import {ATMessage, ATMessageType} from "../../../global/types/entity/ATMessage";
import env from "../../../global/env"
import {getOrCreateGA4ClientId, sendGA4Event} from "../../../global/utils/ga4";

let cacheGA4ClientId: string | undefined

export function messageHandler () {
    chrome.runtime.onMessage.addListener(function(message: ATMessage, sender, sendResponse) {
        switch (message.type) {
            case ATMessageType.SendEventToServiceWorker:
                const noEvents = message.payload;
                (async () => {
                    chrome.action.setBadgeText({
                        text: noEvents > env.BADGE_EVENT_MAX ? `>${env.BADGE_EVENT_MAX}` : noEvents.toString(),
                        tabId: sender.tab?.id
                    }).catch(console.error)
                    sendResponse({})
                })()
                break;
            case ATMessageType.SendGA4Event:
                const params = message.payload;
                (async () => {
                    try {
                        if (!cacheGA4ClientId)
                            cacheGA4ClientId = await getOrCreateGA4ClientId()
                        await sendGA4Event(params, cacheGA4ClientId)
                    } catch (_) {
                        console.error(_)
                    }
                    sendResponse()
                })();
                break;
            default:
        }
        return true;
    })
}