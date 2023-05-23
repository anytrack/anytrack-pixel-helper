export enum ATMessageType {
    SendEventToPopup='SendEventToPopup',
    SendActiveTabLoadedStateToPopup='SendActiveTabLoadedStateToPopup',
    SendAnyTrackIdToBackground='SendAnyTrackIdToBackground',
    SendEventToServiceWorker='SendEventToServiceWorker',
    SendResponse='SendResponse',
    SendGA4Event='SendGA4Event'
}
export interface ATMessage {
    payload?: any,
    type: ATMessageType
}