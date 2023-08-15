// actions/login.ts
import axiosClient from '@apis/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setUser } from '@store/authSlice';
// import { setUser } from '@stores/userSlice';
import { LoginResponse, User } from 'src/models/auth';

interface LoginUser {
    Username: string;
    Password: string;
}

export const loginUser = createAsyncThunk<void, LoginUser, { rejectValue: string }>('user/login', async (credentials, thunkAPI) => {
    try {
        console.log('credentials', credentials);
        const response = await axiosClient.post<LoginResponse>('/api/login/auth', null, { params: credentials });
        console.log('response', response);

        // if (!response || response.data.result !== 'success') {
        //   return thunkAPI.rejectWithValue('Username or password wrong!')
        // }

        // Save token in localStorage after successful login
        if (response.data.success) {
            const userInfo: User = JSON.parse(response.data.data);
            localStorage.setItem('token', userInfo.token);
            localStorage.setItem('user', JSON.stringify(userInfo));
            // // Dispatch setUser action to update the user state
            thunkAPI.dispatch(setUser(userInfo)); // Pass the entire params as payload
        } else {
            //dípatch error
            const errorMessage = response.data.errors[0];
            thunkAPI.dispatch(setError(errorMessage)); // Dispatch error action
        }
    } catch (error) {
        console.error(error); // Log the error to see more details
        return thunkAPI.rejectWithValue('Failed to log in');
    }
});
