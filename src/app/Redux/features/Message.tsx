'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type Message = {
    type: 'user' | 'bloc',
    text: string
}

 export type MessageState = Message[]

const initialState: MessageState = []



export const messageSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addMessage: (state, action:PayloadAction<Message>) => {
            state.push(action.payload)
        },
        clearMessage:(state)=>{
            state.splice(0, state.length);
        }
    }
}
)

export const { addMessage,clearMessage } = messageSlice.actions
export default messageSlice.reducer