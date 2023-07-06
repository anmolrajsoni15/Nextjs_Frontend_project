'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AddWebsite {
    url: string;
}

interface websiteState {
    urls: AddWebsite[];
}

const initialState: websiteState = {
    urls: [],
}

export const addWebsiteSlice = createSlice({
    name: 'websiteAdded',
    initialState,
    reducers: {
        addWebsite: (state, action: PayloadAction<AddWebsite>) => {
            const newURL = action.payload;
            state.urls.push(newURL);
          },
      
        clearWebsites: (state) => {
            state.urls = [];
        },
        clearWebsite:(state,action:PayloadAction<string>)=>{
            const urlData = action.payload
            state.urls = state.urls.filter(link=>link.url != urlData)
        }
       
    }
})

export const { addWebsite, clearWebsites,clearWebsite } = addWebsiteSlice.actions
export default addWebsiteSlice.reducer
