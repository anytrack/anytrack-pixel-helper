import {BadgeColor} from "../../../global/config";
import OnInstalledReason = chrome.runtime.OnInstalledReason;
import {getOrCreateGA4ClientId} from "../../../global/utils/ga4";

const badgeHandler = async () => {
    try {
        await chrome.action.setBadgeBackgroundColor({
            color: BadgeColor.background
        })

        await chrome.action.setBadgeTextColor({
            color: BadgeColor.text
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

export const bootstrap = async () => {
    try {
        await badgeHandler()
        setupGA4ClientId()
    } catch (e) {
        console.error(e)
    }
}