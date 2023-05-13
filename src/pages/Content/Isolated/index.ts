import {ATCustomEvent} from "../../../global/types/entity/ATCustomEvent";
import {ATMessageType} from "../../../global/types/entity/ATMessage";
import {getEventSnippets} from "./modules/eventSnippet";
import {PixelNetworkInfo} from "../../../global/types/entity/PixelNetwork";
import {getScriptInfo} from "./modules/pixelNetwork";


declare global {
    interface Window {
        ATEventLog: any[],
        ATeventSnippets: string[],
        pixelNetworkInfo: PixelNetworkInfo,
        google_tag_manager: any
    }
}

window.ATEventLog = []
window.ATeventSnippets = []
window.pixelNetworkInfo = {
    scriptInfo: [],
    gtm: {},
    ATConfigPixel: {},
}

function main () {
    // This is to avoid error when extension updates a new version
    if (!chrome.runtime)
        return

    document.addEventListener(ATCustomEvent.SendAnyTrackEventToContentScript, async function (e: any) {
        if (e.detail !== undefined && e.detail.payload !== undefined) {
            window.ATEventLog.push(e.detail.payload)
            try {
                await chrome.runtime.sendMessage({
                    type: ATMessageType.SendEventToServiceWorker,
                    payload: window.ATEventLog.length
                })
            } catch (_) {
                console.log(_)
            }
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

    document.addEventListener(ATCustomEvent.SendPixelNetworkToContentScript, async function (e: any) {
        if (e.detail !== undefined && e.detail.payload !== undefined) {
            window.pixelNetworkInfo = {...window.pixelNetworkInfo, ...e.detail.payload}
        }
    })

    window.addEventListener('load', function() {
        window.ATeventSnippets = getEventSnippets()
        window.pixelNetworkInfo.scriptInfo = getScriptInfo()
    })
}

main()