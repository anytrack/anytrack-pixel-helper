import env from "../env";
import {Ga4Payload, StorageKey} from "../types/entity";
import {generateHash} from "./index";
const url = `https://www.google-analytics.com/mp/collect`

export const sendGA4Event = async (payload: Ga4Payload, clientId: string) => {
    const {name, ...rest} = payload
    return fetch(`${url}?measurement_id=${env.GA4_MEASUREMENT_ID}&api_secret=${env.GA4_SECRET_KEY}`, {
        method: "POST",
        body: JSON.stringify({
            client_id: clientId,
            timestamp_micros: new Date().getTime() * 1000,
            events: [{
                name,
                params: {
                    ...rest
                }
            }]
        })
    });
}

/**
 * Get GA4 client ID if it already exists, otherwise create new one
 * This ensures only one clientId exists
 * @returns {Promise<string>}
 */
export const getOrCreateGA4ClientId = async (): Promise<string> => {
    const data = await chrome.storage.sync.get([StorageKey.GA4ClientId])
    if (data[StorageKey.GA4ClientId] !== undefined)
        return data[StorageKey.GA4ClientId]
    const ga4ClientId = generateHash(env.GA4_CLIENT_LEN)
    await chrome.storage.sync.set({[StorageKey.GA4ClientId]: ga4ClientId })
    return ga4ClientId
}