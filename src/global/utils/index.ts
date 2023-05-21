import Tab = chrome.tabs.Tab;

export const getActiveTab = async (): Promise<Tab | undefined> => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return tab
}

export const displayedValue = (value: any) =>  [null, undefined].includes(value) ? 'Not set' :
    typeof value === 'string' ? value : JSON.stringify(value)

export const formatDate = (dateString: string) => new Date(dateString).toLocaleString().replace(/\//g,'-')

export const generateHash = (length: number): string => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const getHostname = (url: string): string | null => {
    try {
        const temp = new URL(url)
        return temp.hostname
    } catch (_) {
        return null;
    }
}

// TODO: handle pending state when the page is loading
export const anyTrackNotInstalled = (activeTabLoaded: boolean, AId: string | undefined) => {
    return activeTabLoaded && AId === undefined
}