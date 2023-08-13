'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface websiteState {
    urls?: any;
    loading?: boolean;
    postLoading?: boolean;
    error?: any;
    webpages?: any;
}

const initialState: websiteState = {
    urls: [],
    loading: false
}

export const addWebsiteSlice = createSlice({
    name: 'websiteAdded',
    initialState,
    reducers: {
        listWebPagesRequest: (state) => {
            state.loading = true;
        },
        listWebPagesSuccess: (state, action: PayloadAction<any>) => {
            state.urls = action.payload;
            state.loading = false;
        },
        listWebPagesFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
        },
        addWebsitesRequest: (state) => {
            state.postLoading = true;
        },
        addWebsitesSuccess: (state, action: PayloadAction<any>) => {
            state.webpages = action.payload;
            state.postLoading = false;
        },
        addWebsitesFail: (state, action: PayloadAction<any>) => {
            state.postLoading = false;
            state.error = action.payload;
        },
      
        clearWebsites: (state) => {
            state.urls = [];
        }
       
    }
})

export const { 
    listWebPagesRequest,
    listWebPagesSuccess,
    listWebPagesFail,
    addWebsitesRequest,
    addWebsitesSuccess,
    addWebsitesFail,
    clearWebsites
 } = addWebsiteSlice.actions
export default addWebsiteSlice.reducer
