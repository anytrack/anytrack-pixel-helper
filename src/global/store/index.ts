import {
    setupReduxed, ReduxedSetupOptions
} from 'reduxed-chrome-storage';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import logger from 'redux-logger'
import env from "../env";

const storeCreatorContainer = (preloadedState?: any) =>
    configureStore({
        reducer,
        preloadedState,
        middleware: (getDefaultMiddleware) => {
            if (env.NODE_ENV === 'development') {
                return getDefaultMiddleware().concat(logger)
            }
            return getDefaultMiddleware()
        }
    });

const optionsGlobal: ReduxedSetupOptions = {
    plainActions: true,
};

const optionsLocal: ReduxedSetupOptions = {
    plainActions: true,
    isolated: true
};
export const instantiateGlobalStore = setupReduxed(storeCreatorContainer, optionsGlobal);
export const instantiateLocalStore = setupReduxed(storeCreatorContainer, optionsLocal);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStore = Awaited<ReturnType<typeof storeCreatorContainer>>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<RootStore["getState"]>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = RootStore["dispatch"]

