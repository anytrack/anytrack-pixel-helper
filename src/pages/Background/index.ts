import {ATMessage, ATMessageType} from "../../global/entity/ATMessage";

chrome.action.setBadgeBackgroundColor({
    color: 'green'
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