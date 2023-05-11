import {ATMessage, ATMessageType} from "../../global/types/entity/ATMessage";
import {BadgeColor, BadgeMaxEvent} from "../../global/config";

chrome.action.setBadgeBackgroundColor({
    color: BadgeColor.background
}).catch(console.log)

// @ts-ignore
chrome.action.setBadgeTextColor({
    color: BadgeColor.text
}).catch(console.log)
chrome.runtime.onMessage.addListener(function(message: ATMessage, sender, sendResponse) {
    switch (message.type) {
        case ATMessageType.SendEventToServiceWorker:
            const noEvents = message.payload;
            (async () => {
                chrome.action.setBadgeText({
                    text: noEvents > BadgeMaxEvent ? ';)' : noEvents.toString(),
                    tabId: sender.tab?.id
                }).catch(console.log)
                sendResponse({})
            })()
            break;
        default:
    }
    return true;
})