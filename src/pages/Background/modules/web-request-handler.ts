import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import RequestFilter = chrome.webRequest.RequestFilter;
import {AssetScriptEvent} from "../../../global/types/entity/ATScriptEvent";
import {ATEvent} from "../../../global/types/entity/ATEvent";
import env from "../../../global/env";
import {ExtendedStore} from "reduxed-chrome-storage";
import {addNewEventOnTab} from "../../../global/store/reducers/appSlice";

const requestFilters: RequestFilter = {
    urls: [`https://t1.anytrack.dev/assets/*/collect`],
    types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'font', 'object', 'xmlhttprequest', 'ping', 'csp_report', 'media', 'websocket', 'other']
}

const getParsedRequestBody = (details: WebRequestBodyDetails): AssetScriptEvent | undefined => {
    try {
        if (details.requestBody && details.requestBody.raw && details.requestBody.raw.length > 0) {
            const rawData = details.requestBody.raw[0].bytes
            if (!rawData)
                return undefined
            const decodedData = new TextDecoder("utf-8").decode(new Uint8Array(rawData));
            return JSON.parse(decodedData)
        }
        return undefined
    } catch (_) {
        return undefined
    }
}

const convertParsedRequestBodyToATEvent = (parsedRequestBody: AssetScriptEvent): ATEvent => {
    const getValueForAttributeWrapper = (attr: keyof AssetScriptEvent): string => {
        return parsedRequestBody[attr] === undefined ? env.DEFAULT_VALUE_AT_EVENT_ATTRIBUTE : parsedRequestBody[attr] as string
    }

    const mapAttributeFromATScriptEventToATEvent: Record<keyof ATEvent, keyof AssetScriptEvent> = {
        target: 'id',
        eventId: 'id',
        atclid: 'cid',
        clickId: 'cid',
        clientId: 'cid',
        eventName: 'en',
        eventTime: 'ts',
        eventValue: 'ev',
        currency: 'cu',
        trackingGroup: 'tgid',
        link: 'link',
        brandName: 'bn',
        transactionId: 'ti',
        shippingPrice: 'sp',
        taxPrice: 'tp',
    }

    const result: ATEvent = {...mapAttributeFromATScriptEventToATEvent}
    Object.keys(mapAttributeFromATScriptEventToATEvent)
        .forEach((attr) => {
            const _attr = attr as keyof ATEvent
            result[_attr] = getValueForAttributeWrapper(mapAttributeFromATScriptEventToATEvent[_attr])
        })
    return result;
}

export function webRequestHandler (store: ExtendedStore) {
    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            if (!details) {
                return
            }
            const requestBody = getParsedRequestBody(details)
            if (requestBody) {
                const event = convertParsedRequestBodyToATEvent(requestBody)
                // @ts-ignore
                store.dispatch(addNewEventOnTab({event, tabId: details.tabId}))
            }
            console.log(details)
        },
        requestFilters,
        ['requestBody']
    )
}
