"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

interface FileUpload {
  file: File;
  name: string;
  percentCompleted: number;
}

interface FileState {
  files: FileUpload[];
  loading?: boolean;
  error?: any;
  resFiles?: any;
}

const initialState: FileState = {
  files: [],
};

export const UploadedFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    uploadFileRequest: (state) => {
      state.loading = true;
    },
    uploadFileSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.resFiles = action.payload;
      state.files.push(action.payload);
    },
    uploadFileFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteFileRequest: (state) => {
      state.loading = true;
    },
    deleteFileSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.resFiles = action.payload;
    },
    deleteFileFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
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
    clearFile: (state, action: PayloadAction<string>) => {
      const fileName = action.payload;
      state.files = state.files.filter((file) => file.name != fileName);
    },
  },
});

export const {
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileFail,
  deleteFileRequest,
  deleteFileSuccess,
  deleteFileFail, 
  addFile, 
  clearFiles, 
  setPercentCompleted, 
  clearFile 
} =
  UploadedFileSlice.actions;
export default UploadedFileSlice.reducer;
