import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    address: string;
    balance: number;
    attempts: number;
}

const initialState: UserState = {
    isLoggedIn: false,
    address: '0x0',
    balance: 0,
    attempts: 0
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
        setBalance(state, action: PayloadAction<number>) {
            state.balance = +Math.floor(action.payload / 10 ** 18).toFixed(0);
        },
        setAttempts(state, action: PayloadAction<number>) {
            state.attempts = action.payload;
        },
        setLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        }
    }
});

export const userActions = {
    ...userSlice.actions
};
