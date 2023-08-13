"use client";

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface TutorialState {
  newUser: boolean,
    showTutorial: boolean,
}

// Define the initial state using that type
const initialState: TutorialState = {
  newUser: false,
    showTutorial: false,
}

export const tutorialSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setNewUser: (state) => {
        state.newUser = false
        },
    setShowTutorial: (state) => {
        state.showTutorial = false
        },
    setOldUser: (state) => {
        state.newUser = false
        },
    setCloseTutorial: (state) => {
        state.showTutorial = false
        }

  },
})

export const { setNewUser, setShowTutorial, setOldUser, setCloseTutorial } = tutorialSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default tutorialSlice.reducer