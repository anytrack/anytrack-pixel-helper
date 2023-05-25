import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import {ATEvent} from "../../types/entity/ATEvent";
import {setBadgeTextByTabId} from "../../utils";


type AppState = {[key: string]: ATEvent[]}
const initialState: AppState = {
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetEventOnTab: (state: Draft<AppState>, action: PayloadAction<number>) => {
      const tabId = action.payload
      state[tabId] = []
      setBadgeTextByTabId(0, tabId)
    },
    addNewEventOnTab: (state: Draft<AppState>, action: PayloadAction<{event: ATEvent, tabId: number}>) => {
      const {event, tabId} = action.payload
      if (!state[tabId]) {
        state[tabId] = []
      }
      state[tabId].push(event)
      setBadgeTextByTabId(state[tabId].length, tabId)
    }
  }
})

// Action creators are generated for each case reducer function
export const { addNewEventOnTab, resetEventOnTab} = appSlice.actions

export default appSlice.reducer
