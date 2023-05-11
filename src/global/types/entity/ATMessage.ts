export enum ATMessageType {
    SendEventToPopup='SendEventToPopup',
    SendEventToServiceWorker='SendEventToServiceWorker',
    SendResponse='SendResponse',
    SendGA4Event='SendGA4Event'
}
export interface ATMessage {
    payload?: any,
    type: ATMessageType
}