"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

interface FileUpload {
    id:number;
  file: File;
  name: string;
  size: number;
  percentCompleted: number;
}

interface FileState {
    loading?: boolean;
  files: FileUpload[];
  error?: any;
  resFiles?: any;
  message?: any;
}

const initialState: FileState = {
  files: [],
};

export const UploadedFileSlice2 = createSlice({
  name: "uploadFile2",
  initialState,
  reducers: {
    uploadFileRequest2: (state) => {
        state.loading = true;
        },
    uploadFileSuccess2: (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.resFiles = action.payload;
        state.message = "success";
    },
    uploadFileFail2: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addFile2: (state, action: PayloadAction<FileUpload>) => {
      const newFile = action.payload;
      state.files.push(newFile);
    },

    clearFiles2: (state) => {
      state.files = [];
    },
    setPercentCompleted2: (
      state,
      action: PayloadAction<{ind: number, percentCompleted: number }>
    ) => {
      const { ind, percentCompleted } = action.payload;
      const file = state.files.find((file) => file.id === ind);
      if (file) {
        file.percentCompleted = percentCompleted;
      }
    },
    clearFile2: (state, action: PayloadAction<any>) => {
      const ind = action.payload;
      console.log(ind);
      state.files = state.files.filter((data: any) => data.id != ind);
    },
    clearMessage2: (state) => {
        state.message = "";
        },
  },
});

export const {
    uploadFileRequest2,
    uploadFileSuccess2,
  uploadFileFail2, 
  addFile2, 
  clearFiles2, 
  setPercentCompleted2, 
  clearFile2,
  clearMessage2
} =
  UploadedFileSlice2.actions;
export default UploadedFileSlice2.reducer;
