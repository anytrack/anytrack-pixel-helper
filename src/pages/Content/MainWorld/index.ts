import {ATCustomEvent as ATCustomEvent} from "../../../global/types/entity/ATCustomEvent"
import {ATEvent, StandardEventName} from "../../../global/types/entity/ATEvent";

const main = () => {

    document.dispatchEvent(new CustomEvent(ATCustomEvent.SendAnyTrackIdToContentScript, {
        detail: {
            payload: AnyTrack('aid')
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
window.addEventListener("load", function () {
    // When the page is loaded, sometimes AnyTrack SDK is not yet available
    const t = setInterval(function()  {
        if (typeof AnyTrack !== 'undefined') {
            main();
            clearInterval(t)
        }
    }, 1000)
})