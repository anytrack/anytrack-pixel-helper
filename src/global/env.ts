// This is a wrapper for .env.<development|production> with default value setting and other handlers
const env = {
    GA4_MEASUREMENT_ID: process.env.GA4_MEASUREMENT_ID,
    GA4_SECRET_KEY: process.env.GA4_SECRET_KEY,
    GA4_CLIENT_LEN: parseInt(process.env.GA4_CLIENT_LEN || '') || 50 ,

    BADGE_COLOR_BACKGROUND: process.env.BADGE_COLOR_BACKGROUND || 'orange',
    BADGE_COLOR_TEXT: process.env.BADGE_COLOR_TEXT || 'white',
    BADGE_EVENT_MAX: parseInt(process.env.BADGE_EVENT_MAX || '') || 999,

    DEFAULT_VALUE_AID: process.env.DEFAULT_VALUE_AID,
    DEFAULT_VALUE_AT_EVENT_ATTRIBUTE: process.env.DEFAULT_VALUE_AT_EVENT_ATTRIBUTE || 'Not set' as string
}

export default env