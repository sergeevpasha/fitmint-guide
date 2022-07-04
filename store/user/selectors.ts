import { createSelector } from '@reduxjs/toolkit';

import { RootStore } from '..';
import { userSlice } from './slice';

const rootSelector = (state: RootStore) => state[userSlice.name];

export const selectLoggedIn = createSelector(rootSelector, ({ isLoggedIn }) => isLoggedIn);
export const selectAddress = createSelector(rootSelector, ({ address }) => address);
export const selectBalance = createSelector(rootSelector, ({ balance }) => balance);
export const selectAttempts = createSelector(rootSelector, ({ attempts }) => attempts);
