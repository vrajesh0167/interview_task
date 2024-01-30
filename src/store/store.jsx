import { configureStore } from '@reduxjs/toolkit';
import userslice from './user/userslice';

export const Store = configureStore({
    reducer: {
        user: userslice,
    }
})