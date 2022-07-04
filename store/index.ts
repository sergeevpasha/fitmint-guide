import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slice';

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer
    }
});

export type RootStore = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
