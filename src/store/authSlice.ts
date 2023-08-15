import { User } from '@models/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
    isAuthenticated: localStorage.getItem('token') === 'true',
    fullName: '',
    refreshToken: '',
    token: '',
    userId: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return { ...action.payload, isAuthenticated: true }; // Spread the payload and set isAuthenticated to true
        },
        logoutUser: (state) => {
            console.log(state);
            // Reset state to initial state on logout
            return initialState;
        },
    },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
