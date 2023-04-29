export enum ATMessageType {
    SendEventToPopup='SendEventToPopup'
}
export interface ATMessage {
    payload: any,
    type: ATMessageType
}