import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BlocState =  {
  blocName: string,
  initialMsg:string,
  basePrompt:string,
  subHeading:string,
  openAiModel:"gpt3.5-turbo" | 'gpt-4'
}

const initialState: BlocState = {
  blocName: '',
  initialMsg:'Hi I am bloc, How can I help you?',
  basePrompt:'',
  subHeading:'',
  openAiModel: 'gpt3.5-turbo'
};

export const blocSlice = createSlice({
  name: 'bloc',
  initialState,
  reducers: {
    setBlocName: (state, action: PayloadAction<string>) => {
      state.blocName = action.payload;
    },
    setInitialMessage: (state, action: PayloadAction<string>) => {
      state.initialMsg = action.payload;
    },
    setBasePrompt: (state, action: PayloadAction<string>) => {
      state.basePrompt = action.payload;
    },
    setSubHeading: (state, action: PayloadAction<string>) => {
      state.subHeading = action.payload;
    },
    setOpenAiModel: (state, action: PayloadAction<"gpt3.5-turbo" | 'gpt-4'>) => {
      state.openAiModel = action.payload;
    },
    clearBlocName: (state) => {
      state.blocName = '';
    },
  },
});

export const { setBlocName,setInitialMessage, setBasePrompt, setSubHeading, setOpenAiModel, clearBlocName } = blocSlice.actions;
export default blocSlice.reducer;
