import {ATCustomEvent as ATCustomEvent} from "../../../global/types/entity/ATCustomEvent"
import {ATEvent, StandardEventName} from "../../../global/types/entity/ATEvent";
import {AidDefaultValue} from "../../../global/config";

const getAnyTrackDataWrapper = (args: any[], defaultResult: any) => {
    try {
        return AnyTrack.apply(null, args)
    } catch (_) {
        return defaultResult
    }
}

const getAnyTrackConfig = () => {
    if (!AnyTrack('aid')) {
        // Handle case when AnyTrack is available, but AnyTrack('aid') is still undefined
        document.dispatchEvent(new CustomEvent(ATCustomEvent.SendPixelNetworkToContentScript, {
            detail: {
                payload: {
                    Aid: AidDefaultValue
                }
            }
        }));
        waitUntilAvailable(getAnyTrackConfig, () => AnyTrack('aid') !== undefined)
        return;
    }
    document.dispatchEvent(new CustomEvent(ATCustomEvent.SendPixelNetworkToContentScript, {
        detail: {
            payload: {
                Aid: AnyTrack('aid'),
                ATConfigPixel: getAnyTrackDataWrapper(['config', 'pixels'], {})
            }
        }
    }));

}

const anyTrackEventHandler = () => {
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

const waitUntilAvailable = (func: Function, stopConditionFunc: () => Boolean) => {
    const t = setInterval(function()  {
        if (stopConditionFunc()) {
            func();
            clearInterval(t)
        }
    }, 100)

}

window.addEventListener("load", function () {
    waitUntilAvailable(gtmHandler, () => typeof window.google_tag_manager !== 'undefined')
})

waitUntilAvailable(getAnyTrackConfig,() => typeof AnyTrack !== 'undefined')
waitUntilAvailable(anyTrackEventHandler, () => typeof AnyTrack !== 'undefined')