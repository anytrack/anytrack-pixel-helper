import {ATCustomEvent} from "../../global/entity/ATCustomEvent";
import { ATEvent } from "../../global/entity/ATEvent";
import {ATMessageType} from "../../global/entity/ATMessage";

declare global {
    interface Window { ATEventLog:ATEvent[] }
}
window.ATEventLog = []
function main () {
    // This is to avoid error when extension updates a new version
    if (!chrome.runtime)
        return

    document.addEventListener(ATCustomEvent.SendAnyTrackEventToContentScript, async function (e: any) {
        if (e.detail !== undefined && e.detail.payload !== undefined) {
            window.ATEventLog.push(e.detail.payload)
            try {
                await chrome.runtime.sendMessage({
                    type: ATMessageType.SendEventToPopup,
                    payload: window.ATEventLog
                })
            } catch (_) {
                // Capture error when popup doesn't exist
                console.log(_)
            }
        }
    })
}

main()