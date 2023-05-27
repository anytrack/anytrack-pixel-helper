import {ATMessage, ATMessageType} from "../../../global/types/entity/ATMessage";
import env from "../../../global/env"
import {getOrCreateGA4ClientId, sendGA4Event} from "../../../global/utils/ga4";
import {ExtendedStore} from "reduxed-chrome-storage";
import {resetEventOnTab} from "../../../global/store/reducers/appSlice";

let cacheGA4ClientId: string | undefined

export function messageHandler (store: ExtendedStore) {
    chrome.runtime.onMessage.addListener(function(message: ATMessage, sender, sendResponse) {
        switch (message.type) {
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
            case ATMessageType.SendRequestToResetEventToServiceWorker:
                // @ts-ignore
                store.dispatch(resetEventOnTab(sender.tab?.id))
                sendResponse()
                break;
            default:
        }
        return true;
    })
}