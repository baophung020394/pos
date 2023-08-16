// src/store/channelSlice.ts
import { Customer } from '@models/customer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
    currentCustomer: Customer | null;
}

const initialState: CustomerState = {
    currentCustomer: null,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCurrentCus(state, action: PayloadAction<Customer>) {
            state.currentCustomer = action.payload;
        },
    },
});

export const { setCurrentCus } = customerSlice.actions;

export default customerSlice.reducer;
