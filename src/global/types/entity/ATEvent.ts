export interface ATEvent {
    eventId: string,
    clientId: string,
    eventName: string,
    eventTime: string,
    eventValue: string,
    currency: string,
    trackingGroup: string,
    link: string,
    brandName: string,
    transactionId: string,
    shippingPrice: string,
    taxPrice: string,
}

export enum StandardEventName {
    PageView = "PageView",
    OutboundClick = "OutboundClick",
    FormSubmit = "FormSubmit",
    ViewContent = "ViewContent",
    AddToCart = "AddToCart",
    InitiateCheckout = "InitiateCheckout",
    Lead = "Lead",
    CompleteRegistration = "CompleteRegistration",
    Purchase = "Purchase",
    AddPaymentInfo = "AddPaymentInfo"
}