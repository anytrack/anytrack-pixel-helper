export interface AssetScriptEvent {
    cid: AssetScriptClientId; // string

    // times
    ts: number; // timestamp
    pt?: number; // previous event time

    nc?: 1; // new client id, always 1

    // basic
    en: EventName; // event name, string
    ev?: number; // event value
    cu?: CurrencyCode; // ISO 3-letter USD, EUR and etc.
    id?: AssetScriptEventId; // event id, string
    rid?: AssetScriptEventRefId; // event refId, string

    // document
    dl: string; // document location
    dr?: string; // document referrer
    dt?: string; // document title
    pv?: string; // page variant

    tgid?: TrackingGroupId; // tracking group id, string
    link?: AssetScriptEventLink; // link data

    // ecommerce
    bn?: string; // brand name
    ti?: string; // transaction id
    sp?: number; // shipping price
    tp?: number; // tax price
    ei?: AssetScriptEventItem[]; // event items

    // client pixels
    cp?: AssetScriptClientPixel[]; // client pixel configs
    ss?: 1; // force server-side

    // traits
    em?: string; // email
    fn?: string; // first name
    ln?: string; // last name
    ph?: string; // phone
    db?: string; // birth date
    ct?: string; // city
    st?: string; // state
    zp?: string; // zip code
    cn?: string; // country
}

interface AssetScriptEventItem {
    id: string;
    nm?: string; // item name
    qt: number; // quantity
    pr: number; // item price
}

// pixel config
interface AssetScriptClientPixel {
    type: AssetScriptClientPixelType;
    id: AssetScriptClientPixelId;
    clientId: AssetScriptClientPixelClientId;
    externalId?: string;
    payload?: Record<string, string | number | undefined>;
    ss?: 1;
}

// parced link config
export interface AssetScriptEventLink {
    label: string;
    id?: string;
    url?: string;
    method?: string;
}

export enum AssetScriptClientPixelType {
    GoogleAnalytics = 'ga',
    GoogleAnalytics4 = 'g4',
    GoogleAds = 'aw',
    FacebookPixel = 'fbq',
    BingUET = 'uet',
    TaboolaPixel = 'tfa',
    OutbrainPixel = 'obApi',
    TiktokPixel = 'ttq',
}

export type AssetScriptClientPixelId = string;
export type AssetScriptClientPixelClientId = string;

type AssetScriptClientId = string;
type AssetScriptEventId = string;
type EventName = string;
type CurrencyCode = string;
type AssetScriptEventRefId = string;
type TrackingGroupId = string;