import {ATMessage, ATMessageType} from "../../global/entity/ATMessage";
import {BadgeColor} from "../../global/config";

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
                    text: noEvents > 10000 ? '10000+' : noEvents.toString(),
                    tabId: sender.tab?.id
                }).catch(console.log)
                sendResponse({})
            })()
            break;
        default:
    }
    return true;
})