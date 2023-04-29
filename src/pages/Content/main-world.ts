import {ATCustomEvent as ATCustomEvent} from "../../global/entity/ATCustomEvent"
import {ATEvent} from "../../global/entity/ATEvent";

const main = () => {
    AnyTrack(
        'bind',
        'ViewContent', // standard event name
        function (e: ATEvent) {
            document.dispatchEvent(new CustomEvent(ATCustomEvent.SendAnyTrackEventToContentScript, {
                detail: {
                    payload: e
                }
            }));
        }
    )
}
window.addEventListener("load", function () {
    console.log(AnyTrack('aid'))
    main();
})