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
        google_tag_manager: any,
        // Check if window.onload event has abeen fired
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

const notify = async (type: ATMessageType, payload?: any) => {
    try {
        await chrome.runtime.sendMessage({
            type,
            payload
        })
    } catch (_) {
        console.log(_)
    }
}

const notifyPopup = async (payload?: any) => {
    return notify(ATMessageType.SendActiveTabLoadedStateToPopup, payload)
}

const notifyBackground = async(payload?: any) => {
    return notify(ATMessageType.SendActiveTabLoadedStateToBackground, payload)
}

function main () {
    // This is to avoid error when extension updates a new version
    if (!chrome.runtime)
        return

    document.addEventListener(ATCustomEvent.SendAnyTrackEventToContentScript, async function (e: any) {
        if (e.detail !== undefined && e.detail.payload !== undefined) {
            window.ATEventLog.push(e.detail.payload)
            await notifyBackground(window.ATEventLog.length)
            await notifyPopup(window.ATEventLog)
        }
    })

    document.addEventListener(ATCustomEvent.SendPixelNetworkToContentScript, async function (e: any) {
        console.log("pixel", e.detail.payload)
        if (e.detail !== undefined && e.detail.payload !== undefined) {
            window.pixelNetworkInfo = {...window.pixelNetworkInfo, ...e.detail.payload}
        }
        await notifyPopup()
        // Fundamentally, notify background that AnyTrack is available to change popup icon
        await notifyBackground({
            Aid: window.pixelNetworkInfo.Aid
        })
    })

    window.addEventListener('load', async function() {
        window.ATeventSnippets = getEventSnippets()
        window.pixelNetworkInfo.scriptInfo = getScriptInfo()

        window.loaded = true
        await notifyPopup()

        // Notify to background to change popup icon
        await notifyBackground({ Aid: window.pixelNetworkInfo.Aid })
    })
}

main()