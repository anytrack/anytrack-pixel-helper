import { ATMessageType } from "../types/entity/ATMessage";
import Tab = chrome.tabs.Tab;
import env from "../env";
import {RootState} from "../store";
import {AssetScriptEvent} from "../types/entity/ATScriptEvent";

export const getActiveTab = async (): Promise<Tab | undefined> => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab
}

export const displayedValue = (value: any) => typeof value === 'string' ? value : JSON.stringify(value)

export const formatDate = (dateString: string) => new Date(dateString).toLocaleString().replace(/\//g,'-')

export const generateHash = (length: number): string => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const getHostname = (url: string): string | null => {
    try {
        const temp = new URL(url)
        return temp.hostname
    } catch (_) {
        return null;
    }
}

export const anyTrackNotInstalled = (activeTabLoaded: boolean, AId: string | undefined) => {
    return activeTabLoaded && AId === undefined
}

export const notify = async (type: ATMessageType, payload?: any) => {
    try {
        await chrome.runtime.sendMessage({
            type,
            payload
        })
    } catch (_) {
        console.error(_)
    }
}

export const setBadgeTextByTabId = (noEvents: number, tabId: number) => {
    chrome.action.setBadgeText({
        text: noEvents > env.BADGE_EVENT_MAX ? `>${env.BADGE_EVENT_MAX}` : !noEvents ? '' : noEvents.toString(),
        tabId
    }).catch(console.error)
}

export const setPopupIcon = (tabId: number | undefined, iconPath = 'logo-square-128.png') => {
    if (tabId === undefined)
        return
    chrome.action.setIcon({
        tabId,
        path: iconPath
    }).catch(console.error)
}

export const getATEventLogSelector = (window: Window) => ((state: RootState) => {
    const atEventLog = state.app[window.tabId] || []
    return [...atEventLog].reverse()
})

export const getParametersFromUrl = (url: string): {[key: string]: any}=> {
    const paramsString = url.split('?')[1]
    return Object.fromEntries(new URLSearchParams(paramsString))
}

