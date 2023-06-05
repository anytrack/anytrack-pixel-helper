export enum PixelNetwork {
    None,
    Other,
    Facebook='Facebook',
    TikTok='tikTokPixel',
    GA4='GA4',
    GoogleAds='googleAds',
    UniversalAnalytics='googleAnalytics',
    Bing='bingPixel',
    Taboola='taboolaPixel',
    Outbrain='outbrainPixel'
}

export enum ScriptInitiator {
    AnyTrack='AnyTrack',
    GoogleTagManager='Google Tag Manager',
    OnPage='OnPage'
}

export type ScriptInfo = {
    inHeadTag: boolean,
} & {[key in string]: any}


export type PixelNetworkInfo = {
    scriptInfo: ScriptInfo[],
    gtm: {[key: string]: any},
    ATConfigPixel: any,
    Aid?: string
}

export type PixelNetworkConfig = {
    hostname: string[],
    additionalCondition?: (scriptSrc: string) => Boolean,
    displayName: string,
    getAccountId?: (scriptSrc: string) => string
}