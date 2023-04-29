export enum ATMessageType {
    SendEventToPopup='SendEventToPopup',
    SendResponse='SendResponse'
}
export interface ATMessage {
    payload?: any,
    type: ATMessageType
}