export enum ATMessageType {
    SendActiveTabLoadedStateToPopup='SendActiveTabLoadedStateToPopup',
    SendAnyTrackIdToServiceWorker='SendAnyTrackIdToServiceWorker',
    SendRequestToResetEventToServiceWorker='SendRequestToResetEventToServiceWorker',
    SendResponse='SendResponse',
    SendGA4Event='SendGA4Event'
}
export interface ATMessage {
    payload?: any,
    type: ATMessageType
}