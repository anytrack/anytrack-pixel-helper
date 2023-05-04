export enum ATMessageType {
    SendEventToPopup='SendEventToPopup',
    SendEventToServiceWorker='SendEventToServiceWorker',
    SendResponse='SendResponse'
}
export interface ATMessage {
    payload?: any,
    type: ATMessageType
}