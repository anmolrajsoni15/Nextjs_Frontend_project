'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { v4 as uuidv4 } from 'uuid';

interface FileUpload {
    file: File;
    name: string;
    percentCompleted: number;
}

interface FileState {
    files: FileUpload[];
}

const initialState: FileState = {
    files: [],
}

export const UploadedFileSlice = createSlice({
    name: 'uploadFile',
    initialState,
    reducers: {
        addFile: (state, action: PayloadAction<FileUpload>) => {
            const newFile = action.payload;
            state.files.push(newFile);
          },
      
        clearFiles: (state) => {
            state.files = [];
        },
        setPercentCompleted: (
          state,
          action: PayloadAction<{ name: string; percentCompleted: number }>
        ) => {
          const { name, percentCompleted } = action.payload;
          const file = state.files.find((file) => file.name === name);
          if (file) {
            file.percentCompleted = percentCompleted;
          }
        },
        clearFile:(state,action:PayloadAction<string>)=>{
        const fileName = action.payload
         state.files = state.files.filter(file=>file.name != fileName)
        }
       
    }
})

export const { addFile, clearFiles, setPercentCompleted,clearFile } = UploadedFileSlice.actions
export default UploadedFileSlice.reducer
