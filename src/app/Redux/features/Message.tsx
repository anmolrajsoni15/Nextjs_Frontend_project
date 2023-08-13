'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type Message = {
    id: any,
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
        updateMessage:(state,action:PayloadAction<Message>)=>{
            const index = state.findIndex((message) => message.id === action.payload.id);

            if (index !== -1) {
                // Get the existing message
                let existingMessage = state[index];
                if(existingMessage.text === "Loading..."){
                    existingMessage.text = "";
                }
                // Update the text by adding action.payload.text
                existingMessage.text += action.payload.text;
                // Update the state with the modified message
                state[index] = existingMessage;
            }
        },
        clearMessage:(state)=>{
            state.splice(0, state.length);
        }
    }
}
)

export const { addMessage,updateMessage,clearMessage } = messageSlice.actions
export default messageSlice.reducer