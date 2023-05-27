import env from "../../../global/env";
import {getOrCreateGA4ClientId} from "../../../global/utils/ga4";
import OnInstalledReason = chrome.runtime.OnInstalledReason;
import {instantiateGlobalStore} from "../../../global/store";
import {resetAppState} from "../../../global/store/reducers/appSlice";

const badgeHandler = async () => {
    try {
        await chrome.action.setBadgeBackgroundColor({
            color: env.BADGE_COLOR_BACKGROUND
        })

        await chrome.action.setBadgeTextColor({
            color: env.BADGE_COLOR_TEXT
        })
    } catch (e) {
        console.error(e)
    }
}

const setupGA4ClientId = () => {
    chrome.runtime.onInstalled.addListener(async function (details) {
        if (OnInstalledReason.INSTALL === details.reason || OnInstalledReason.UPDATE === details.reason) {
            try {
                await getOrCreateGA4ClientId()
            } catch (e) {
                console.error(e)
            }
        }
    })
}

const resetATEventData = () => {
    chrome.runtime.onStartup.addListener(async function () {
        const store = await instantiateGlobalStore();
        store.dispatch(resetAppState());
    });

}
export const bootstrap = async () => {
    try {
        await badgeHandler()
        setupGA4ClientId()
        resetATEventData()
    } catch (e) {
        console.error(e)
    }
}