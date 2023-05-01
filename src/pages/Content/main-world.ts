import {ATCustomEvent as ATCustomEvent} from "../../global/entity/ATCustomEvent"
import {ATEvent, StandardEventName} from "../../global/entity/ATEvent";

const main = () => {
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
    if (typeof AnyTrack !== 'undefined')
        console.log(AnyTrack('aid'))
    const t = setInterval(function()  {
        if (typeof AnyTrack !== undefined) {
            main();
            clearInterval(t)
        }
    }, 1000)
})