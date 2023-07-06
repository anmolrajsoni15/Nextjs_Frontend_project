import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
    user?: any;
    loading?: boolean;
    error?: any;
    credits?: number;
}

const initialState: UsersState = {
    user: {},
    credits: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserRequest: (state) => {
            state.loading = true;
        },
        getUserSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = action.payload;
        },
        getUserFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getCreditRequest: (state) => {
            state.loading = true;
        },
        getCreditSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.credits = action.payload;
        },
        getCreditFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { 
    getUserRequest, 
    getUserSuccess, 
    getUserFail, 
    loginRequest, 
    loginSuccess, 
    loginFail,
    getCreditRequest,
    getCreditSuccess,
    getCreditFail, 
} = userSlice.actions;

export default userSlice.reducer;