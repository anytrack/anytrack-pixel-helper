import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import RequestFilter = chrome.webRequest.RequestFilter;
import {AssetScriptEvent} from "../../../global/types/entity/ATScriptEvent";
import {ATEvent} from "../../../global/types/entity/ATEvent";
import env from "../../../global/env";
import {ExtendedStore} from "reduxed-chrome-storage";
import {addNewEventOnTab} from "../../../global/store/reducers/appSlice";
import {getParametersFromUrl} from "../../../global/utils";

const requestFilters: RequestFilter = {
    urls: env.URL_PATTERNS,
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

const getRequestBodyOrPayload = (details: WebRequestBodyDetails): AssetScriptEvent | undefined => {
    // If the method is GET, get data from payload
    if (details.method === 'GET') {
        const parameters = getParametersFromUrl(details.url)
        if (!isNaN(parseInt(parameters.ts))) {
            parameters.ts = parseInt(parameters.ts)
        }
        return parameters as AssetScriptEvent
    }
    // Otherwise, get data from request body
    return getParsedRequestBody(details)

}

const parseCpAttribute = (parsedRequestBody: AssetScriptEvent): any => {
    const output = Object.entries(parsedRequestBody)
        .filter(([key, _]) => key.match(/^cp\[(\d+?)\]\[(.+?)\]/) !== null)
        .reduce((result, [key, value]) => {
            const parts = key.split(/\[|\]\[|\]/).filter(Boolean);

            parts.reduce((nestedObj, part, index) => {
                if (index === parts.length - 1) {
                    nestedObj[part] = value;
                } else {
                    if (!nestedObj[part]) {
                        nestedObj[part] = isNaN(+parts[index + 1]) ? {} : [];
                    }
                    return nestedObj[part];
                }
            }, result);

            return result;
        }, {} as any);

    return JSON.stringify(output) === '{}' ? env.DEFAULT_VALUE_AT_EVENT_ATTRIBUTE : output.cp;
}


const convertParsedRequestBodyToATEvent = (parsedRequestBody: AssetScriptEvent): Partial<ATEvent> => {
    const getValueForAttributeWrapper = (attr: keyof AssetScriptEvent): any => {
        return parsedRequestBody[attr] === undefined ? env.DEFAULT_VALUE_AT_EVENT_ATTRIBUTE : parsedRequestBody[attr]
    }

    const mapAttributeFromATScriptEventToATEvent: Record<keyof ATEvent, keyof AssetScriptEvent> = {
        eventId: 'id',
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
        items: 'ei',
        cp: 'cp'
    }

    const result: Partial<ATEvent> = {}
    Object.keys(mapAttributeFromATScriptEventToATEvent)
        .forEach((attr) => {
            const _attr = attr as keyof ATEvent

            // Specific handler for parameters with the pattern cp[x][y]. E.g. cp[0][type],...
            if (_attr  === 'cp' && parsedRequestBody.cp === undefined) {
                result[_attr] = parseCpAttribute(parsedRequestBody)
                return
            }

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
            const requestBody = getRequestBodyOrPayload(details)
            if (requestBody) {
                const event = convertParsedRequestBodyToATEvent(requestBody)
                // @ts-ignore
                store.dispatch(addNewEventOnTab({event, tabId: details.tabId}))
            }
        },
        requestFilters,
        ['requestBody']
    )
}
