import {ATMessage, ATMessageType} from "../../../global/types/entity/ATMessage";
import {BadgeMaxEvent} from "../../../global/config"
import {getOrCreateGA4ClientId, sendGA4Event} from "../../../global/utils/ga4";

let cacheGA4ClientId: string | undefined

export function messageHandler () {
    chrome.runtime.onMessage.addListener(function(message: ATMessage, sender, sendResponse) {
        switch (message.type) {
            case ATMessageType.SendEventToServiceWorker:
                const noEvents = message.payload;
                (async () => {
                    chrome.action.setBadgeText({
                        text: noEvents > BadgeMaxEvent ? `>${BadgeMaxEvent}` : noEvents.toString(),
                        tabId: sender.tab?.id
                    }).catch(console.log)
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

                    }
                    sendResponse()
                })();
                break;
            default:
        }
        return true;
    })
}