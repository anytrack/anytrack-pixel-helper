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

export type PixelNetworkInfo = {
    scriptInfo: any[],
    gtm: {[key: string]: any},
    ATConfigPixel: any,
    Aid?: string
}

export type PixelNetworkConfig = {
    hostname: string[],
    displayName: string
}