"use client";

import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter'
import UploadedFileSlice from './features/UploadFile'
import messageSlice from './features/Message'
// import userReducer from './features/userReducer'

export const store = configureStore({
  reducer: {
    counter : counterSlice,
    uploadFile: UploadedFileSlice,
    Message: messageSlice,
    // user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch