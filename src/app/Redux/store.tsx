"use client";

import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter'
import UploadedFileSlice from './features/UploadFile'
import UploadedFileSlice2 from './features/FileUpload'
import UploadedNotionFileSlice from './features/UploadNotionFile'
import addWebsiteSlice from './features/Addwebsite'
import messageSlice from './features/Message'
import blocSlice from './features/blocState'
import newBlocSlice from './features/blocSlice'
import userSlice from './features/userSlice'
import tutorialSlice from './features/Tutorial'

// import userReducer from './features/userReducer'

export const store = configureStore({
  reducer: {
    counter : counterSlice,
    tutorial: tutorialSlice,
    uploadFile: UploadedFileSlice,
    uploadFile2: UploadedFileSlice2,
    uploadNotionFile: UploadedNotionFileSlice,
    addWebsite: addWebsiteSlice,
    Message: messageSlice,
    blocState: blocSlice,
    newBlocState: newBlocSlice,
    user: userSlice,

    // user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch