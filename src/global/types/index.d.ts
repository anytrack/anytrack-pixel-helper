declare const AnyTrack: any;

declare global {
    interface Window {
        tabHostName: string,
        google_tag_manager: {[key: string]: any},
        ATEventLog: any[],
        Aid: string,
        ATeventSnippets: string[],
        pixelNetworkInfo: any
    }
}

declare module '*.png';
declare module '*.svg';