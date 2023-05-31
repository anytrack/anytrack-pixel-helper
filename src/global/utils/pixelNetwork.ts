import {PixelNetwork, PixelNetworkConfig, PixelNetworkInfo, ScriptInitiator} from "../types/entity/PixelNetwork";
import {getHostname} from "./index";

export const PIXEL_NETWORK_CONFIG: Record<PixelNetwork, PixelNetworkConfig> = {
    [PixelNetwork.None]: {
        hostname: [],
        displayName: ''
    },
    [PixelNetwork.Other]: {
        hostname: [],
        displayName: 'Other'
    },
    [PixelNetwork.Outbrain]: {
        hostname: ['tr.outbrain.com'],
        displayName: 'Outbrain'
    },
    [PixelNetwork.UniversalAnalytics]: {
        hostname: ['www.googletagmanager.com'],
        additionalCondition: (scriptSrc: string) => scriptSrc.match(/gtag\/js\?id=UA-/) !== null,
        displayName: 'UA'
    },
    [PixelNetwork.GA4]: {
        hostname: ['www.googletagmanager.com'],
        additionalCondition: (scriptSrc: string) => scriptSrc.match(/gtag\/js\?id=G-/) !== null,
        displayName: 'GA4'
    },
    [PixelNetwork.GoogleAds]: {
        hostname: ['www.googletagmanager.com'],
        additionalCondition: (scriptSrc: string) => scriptSrc.match(/gtag\/js\?id=AW-/) !== null,
        displayName: 'Google Ads'
    },
    [PixelNetwork.Facebook]: {
        hostname: ['www.facebook.com'],
        displayName: 'Facebook'
    },
    [PixelNetwork.Taboola]: {
        hostname: ['trc.taboola.com'],
        displayName: 'Taboola'
    },
    [PixelNetwork.TikTok]: {
        hostname: ['analytics.tiktok.com'],
        displayName: 'TikTok'
    },
    [PixelNetwork.Bing]: {
        hostname: ['bat.bing.com'],
        displayName: 'Bing'
    }
}
export const identifyPixelNetworkFromScript = (scriptInfo: {[key: string]: any}): PixelNetwork => {
    if (!scriptInfo.src)
        return PixelNetwork.None
    const hostname = getHostname(scriptInfo.src)
    if (!hostname)
        return PixelNetwork.None

    return <PixelNetwork>Object.keys(PIXEL_NETWORK_CONFIG)
        .find((key: any) => {
            const hostnamesOfPixelNetwork: string[] = PIXEL_NETWORK_CONFIG[key as PixelNetwork].hostname
            const additionalCondition = PIXEL_NETWORK_CONFIG[key as PixelNetwork].additionalCondition

            let result = hostnamesOfPixelNetwork.includes(hostname)
            if (!result ||  additionalCondition === undefined) {
                return result;
            }
            if (!additionalCondition(scriptInfo.src)) {
                return false
            }
            return true
        }) || PixelNetwork.Other
}


export const identifyScriptInitiatorFromScript = (scriptInfo: {[key: string]: any}, pixelNetworkInfo: PixelNetworkInfo): ScriptInitiator => {
    const pixelNetwork = identifyPixelNetworkFromScript(scriptInfo)

    if (pixelNetwork === PixelNetwork.None || pixelNetwork === PixelNetwork.Other)
        return ScriptInitiator.OnPage

    // Other, check if AnyTrack initializes that script
    const pixelAccountIds = pixelNetworkInfo.ATConfigPixel[pixelNetwork]
    if (!pixelAccountIds || !pixelAccountIds.length)
        return ScriptInitiator.OnPage

    return Object.values(scriptInfo).some(value => pixelAccountIds.some((id: string) => typeof value === 'string' && value.includes(id))) ? ScriptInitiator.AnyTrack : ScriptInitiator.OnPage
}

export const getPixelScripts = (window: Window) => {
    if (!window.pixelNetworkInfo)
        return []
    return (window.pixelNetworkInfo.scriptInfo || [])
        .filter(scriptInfo => identifyPixelNetworkFromScript(scriptInfo) !== PixelNetwork.None)
}

export const getDisplayNameForPixelNetwork = (pixelNetwork: PixelNetwork) => {
    return PIXEL_NETWORK_CONFIG[pixelNetwork].displayName + ' ' + 'Pixel'
}