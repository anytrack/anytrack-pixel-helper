import Tab = chrome.tabs.Tab;

export const getActiveTab = async (): Promise<Tab | undefined> => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab
}

export const displayedValue = (value: any) => typeof value === 'string' ? value : JSON.stringify(value)