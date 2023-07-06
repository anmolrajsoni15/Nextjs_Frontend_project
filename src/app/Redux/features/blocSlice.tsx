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
}

const initialState: BlocState = {
    blocData: {},
    allBlocs: [],
    allIntegrations: [],
    blocsCount: 0,
    integrationData: {},
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
        },
        createBlocFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
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
        updateBlocRequest: (state) => {
            state.loading = true;
        },
        updateBlocSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blocData = action.payload;
        },
        updateBlocFail: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
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
        refreshBloc: (state) => {
            state.blocData = {};
            state.allIntegrations = [];
            state.integrationData = {};
        },
        clearErrors: (state) => {
            state.error = null;
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
    refreshBloc,
    clearErrors
} = newblocSlice.actions;

export default newblocSlice.reducer;



