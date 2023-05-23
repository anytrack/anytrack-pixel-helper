import {ATCustomEvent} from "../../../global/types/entity/ATCustomEvent";
import {ATMessageType} from "../../../global/types/entity/ATMessage";
import {getEventSnippets} from "./modules/eventSnippet";
import {PixelNetworkInfo} from "../../../global/types/entity/PixelNetwork";
import {getScriptInfo} from "./modules/pixelNetwork";
import {notify} from "../../../global/utils";


declare global {
    interface Window {
        ATEventLog: any[],
        ATeventSnippets: string[],
        pixelNetworkInfo: PixelNetworkInfo,
        google_tag_manager: any,
        // Check if window.onload event has been fired
        loaded: boolean | undefined
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
            await notify(ATMessageType.SendEventToServiceWorker, window.ATEventLog.length)
            await notify(ATMessageType.SendEventToPopup, window.ATEventLog)
        }
    })

    document.addEventListener(ATCustomEvent.SendPixelNetworkToContentScript, async function (e: any) {
        // console.log("pixel", e.detail.payload)
        if (e.detail !== undefined && e.detail.payload !== undefined) {
            window.pixelNetworkInfo = {...window.pixelNetworkInfo, ...e.detail.payload}
            await notify(ATMessageType.SendActiveTabLoadedStateToPopup)
        }
    })

    window.addEventListener('load', async function() {
        window.ATeventSnippets = getEventSnippets()
        window.pixelNetworkInfo.scriptInfo = getScriptInfo()

        window.loaded = true
        await notify(ATMessageType.SendActiveTabLoadedStateToPopup)

        // Notify to background to change popup icon.
        await notify(ATMessageType.SendAnyTrackIdToBackground, { Aid: (() => window.pixelNetworkInfo.Aid)() })
    })
}

main()