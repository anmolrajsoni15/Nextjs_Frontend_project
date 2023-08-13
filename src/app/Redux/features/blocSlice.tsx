import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlocState {
    blocData?: any;
    allBlocs?: any;
    blocsCount?: number;
    loading?: boolean;
    error?: any;
    isdeleted?: boolean;
    chatId?: string;
    allIntegrations?: any;
    integrationLoading?: boolean;
    integrationData?: any;
    message?: string;
    mode?: boolean;
    sampleQuestions?: any;
}

const initialState: BlocState = {
    blocData: {},
    allBlocs: [],
    allIntegrations: [],
    blocsCount: 0,
    integrationData: {},
    mode: true,
    sampleQuestions: [],
}

export const newblocSlice = createSlice({
    name: 'bloc',
    initialState,
    reducers: {
        createBlocRequest: (state) => {
            state.loading = true;
        },
        createBlocSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blocData = action.payload;
            state.message = "success";
        },
        createBlocFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
            state.message = "error";
        },
        getAllBlocsRequest: (state) => {
            state.loading = true;
        },
        getAllBlocsSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.allBlocs = action.payload;
        },
        getAllBlocsFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getBlocRequest: (state) => {
            state.loading = true;
        },
        getBlocSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blocData = action.payload;
        },
        getBlocFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getPublicBlocRequest: (state) => {
            state.loading = true;
        },
        getPublicBlocSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blocData = action.payload;
        },
        getPublicBlocFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateBlocRequest: (state) => {
            state.loading = true;
        },
        updateBlocSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blocData = action.payload;
            state.message = "success";
        },
        updateBlocFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
            state.message = "error";
        },
        deleteBlocRequest: (state) => {
            state.loading = true;
        },
        deleteBlocSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blocData = action.payload;
            state.allBlocs = state.allBlocs.filter((bloc: any) => bloc.blocId !== action.payload.blocId);
        },
        deleteBlocUpdate: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isdeleted = action.payload;
        },
        deleteBlocFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getBlocsCountRequest: (state) => {
            state.loading = true;
        },
        getBlocsCountSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blocsCount = action.payload;
        },
        getBlocsCountFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getPrivateChatIdRequest: (state) => {
            state.loading = true;
        },
        getPrivateChatIdSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.chatId = action.payload;
        },
        getPrivateChatIdFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getAllIntegrationsRequest: (state) => {
            state.integrationLoading = true;
        },
        getAllIntegrationsSuccess: (state, action: PayloadAction<any>) => {
            state.integrationLoading = false;
            state.allIntegrations = action.payload;
        },
        getAllIntegrationsFail: (state, action: PayloadAction<any>) => {
            state.integrationLoading = false;
            state.error = action.payload;
        },
        deleteIntegrationRequest: (state) => {
            state.integrationLoading = true;
        },
        deleteIntegrationSuccess: (state, action: PayloadAction<any>) => {
            state.integrationLoading = false;
            state.integrationData = action.payload;
            state.allIntegrations = state.allIntegrations.filter((integration: any) => integration.integrationId !== action.payload.integrationId);
        },
        deleteIntegrationUpdate: (state, action: PayloadAction<any>) => {
            state.integrationLoading = false;
            state.integrationData = action.payload;
        },
        deleteIntegrationFail: (state, action: PayloadAction<any>) => {
            state.integrationLoading = false;
            state.error = action.payload;
        },
        getAllSampleQuestions: (state) => {
            state.sampleQuestions = state.blocData.sampleQuestions;
        },
        updateSampleQuestions: (state, action: PayloadAction<any>) => {
            state.blocData.sampleQuestions = action.payload;
            state.sampleQuestions = state.blocData.sampleQuestions;
        },
        removeSampleQuestion: (state, action: PayloadAction<any>) => {
            state.sampleQuestions = state.sampleQuestions.filter((question: any) => question !== action.payload);
        },
        removeAllSampleQuestions: (state) => {
            state.sampleQuestions = [];
        },
        updateBlocColor: (state, action: PayloadAction<any>) => {
            state.blocData.primaryColor = action.payload.primaryColor;
            state.blocData.secondaryColor = action.payload.secondaryColor;
        },
        updateBlocTheme: (state) => {
            state.mode = state.blocData.isDark;
        },
        refreshBloc: (state) => {
            state.blocData = {};
            state.allIntegrations = [];
            state.integrationData = {};
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = "";
        }
    }
});

export const {
    createBlocRequest,
    createBlocSuccess,
    createBlocFail,
    getAllBlocsRequest,
    getAllBlocsSuccess,
    getAllBlocsFail,
    getBlocRequest,
    getBlocSuccess,
    getBlocFail,
    getPublicBlocRequest,
    getPublicBlocSuccess,
    getPublicBlocFail,
    updateBlocRequest,
    updateBlocSuccess,
    updateBlocFail,
    deleteBlocRequest,
    deleteBlocSuccess,
    deleteBlocUpdate,
    deleteBlocFail,
    getBlocsCountRequest,
    getBlocsCountSuccess,
    getBlocsCountFail,
    getPrivateChatIdRequest,
    getPrivateChatIdSuccess,
    getPrivateChatIdFail,
    getAllIntegrationsRequest,
    getAllIntegrationsSuccess,
    getAllIntegrationsFail,
    deleteIntegrationRequest,
    deleteIntegrationSuccess,
    deleteIntegrationUpdate,
    deleteIntegrationFail,
    getAllSampleQuestions,
    updateSampleQuestions,
    removeSampleQuestion,
    removeAllSampleQuestions,
    updateBlocColor,
    updateBlocTheme,
    refreshBloc,
    clearErrors,
    clearMessage,
} = newblocSlice.actions;

export default newblocSlice.reducer;



