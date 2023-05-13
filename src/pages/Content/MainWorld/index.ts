import {ATCustomEvent as ATCustomEvent} from "../../../global/types/entity/ATCustomEvent"
import {ATEvent, StandardEventName} from "../../../global/types/entity/ATEvent";

const anyTrackHandler = () => {

    document.dispatchEvent(new CustomEvent(ATCustomEvent.SendPixelNetworkToContentScript, {
        detail: {
            payload: {
                Aid: AnyTrack('aid'),
                ATConfigPixel: AnyTrack('config', 'pixels')
            }
        }
    }));

    Object.values(StandardEventName)
        .forEach(eventName => {
            AnyTrack(
                'bind',
                eventName,
                function (e: ATEvent) {
                    document.dispatchEvent(new CustomEvent(ATCustomEvent.SendAnyTrackEventToContentScript, {
                        detail: {
                            payload: e
                        }
                    }));
                }
            )
        })
}

const gtmHandler = () => {
    document.dispatchEvent(new CustomEvent(ATCustomEvent.SendPixelNetworkToContentScript, {
        detail: {
            payload: {
                gtm: Object.keys(window.google_tag_manager)
            }
        }
    }));

}

const waitUntilAvailable = (func: Function, stopCondition: Boolean) => {
    const t = setInterval(function()  {
        if (stopCondition) {
            func();
            clearInterval(t)
        }
    }, 100)

}

window.addEventListener("load", function () {
    // When the page is loaded, sometimes AnyTrack SDK is not yet available
    waitUntilAvailable(anyTrackHandler, typeof AnyTrack !== 'undefined')
    waitUntilAvailable(gtmHandler, typeof window.google_tag_manager !== 'undefined')
})