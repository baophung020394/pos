import { User } from '@models/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState extends User {
    error: string | null; // Thêm trạng thái error
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('token') === 'true',
    fullName: '',
    refreshToken: '',
    token: '',
    userId: '',
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return { ...action.payload, isAuthenticated: true, error: null };
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload; // Cập nhật error từ action payload
        },
        clearError: (state) => {
            state.error = null; // Xóa error
        },
        logoutUser: () => initialState, // Reset state to initial state on logout
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, setError, clearError, logoutUser, logout } = authSlice.actions;

export default authSlice.reducer;
