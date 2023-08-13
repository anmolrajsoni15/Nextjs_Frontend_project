"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';

interface NotionFileUpload {
    id:number;
  file: File;
  name: string;
  size: number;
  percentCompleted: number;
}

interface NotionFileState {
  files: NotionFileUpload[];
  loading?: boolean;
  error?: any;
  resFiles?: any;
}

const initialState: NotionFileState = {
  files: [],
};

export const UploadedNotionFileSlice = createSlice({
  name: "uploadNotionFile",
  initialState,
  reducers: {
    
    uploadNotionFileFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addNotionFile: (state, action: PayloadAction<NotionFileUpload>) => {
      const newFile = action.payload;
      state.files.push(newFile);
    },

    clearNotionFiles: (state) => {
      state.files = [];
    },
    setPercentCompleted: (
      state,
      action: PayloadAction<{ind: number, percentCompleted: number }>
    ) => {
      const { ind, percentCompleted } = action.payload;
      const file = state.files.find((file) => file.id === ind);
      if (file) {
        file.percentCompleted = percentCompleted;
      }
    },
    clearNotionFile: (state, action: PayloadAction<any>) => {
      const ind = action.payload;
      console.log(ind);
      state.files = state.files.filter((data: any) => data.id != ind);
    },
  },
});

export const {
  uploadNotionFileFail, 
  addNotionFile, 
  clearNotionFiles, 
  setPercentCompleted, 
  clearNotionFile 
} =
  UploadedNotionFileSlice.actions;
export default UploadedNotionFileSlice.reducer;
