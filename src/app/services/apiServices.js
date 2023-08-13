import axios from "axios";
import { createBlocFail, createBlocRequest, createBlocSuccess, deleteBlocFail, deleteBlocRequest, deleteBlocSuccess, deleteIntegrationFail, deleteIntegrationRequest, deleteIntegrationSuccess, getAllBlocsFail, getAllBlocsRequest, getAllBlocsSuccess, getAllIntegrationsFail, getAllIntegrationsRequest, getAllIntegrationsSuccess, getBlocFail, getBlocRequest, getBlocSuccess, getPrivateChatIdFail, getPrivateChatIdRequest, getPrivateChatIdSuccess, getPublicBlocFail, getPublicBlocRequest, getPublicBlocSuccess, refreshBloc, updateBlocFail, updateBlocRequest, updateBlocSuccess } from "../Redux/features/blocSlice";
import { getUserFail, getUserRequest, getUserSuccess } from "../Redux/features/userSlice";
import { uploadFileFail, uploadFileRequest, uploadFileSuccess } from "../Redux/features/UploadFile";
import { setCookie } from "cookies-next";
import { addWebsitesFail, addWebsitesRequest, addWebsitesSuccess, listWebPagesFail, listWebPagesRequest, listWebPagesSuccess } from "../Redux/features/Addwebsite";
import { showNotification } from "../Notifications/NotificationManager";
import { setPercentCompleted as setPercentCompletedFile } from "../Redux/features/UploadFile";
import { setPercentCompleted } from "../Redux/features/UploadNotionFile";
import { setPercentCompleted2, uploadFileFail2, uploadFileRequest2, uploadFileSuccess2 } from "../Redux/features/FileUpload";


export async function loginUser(formData) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getUser = (token) => async(dispatch) => {
  try {
    dispatch(getUserRequest());
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFail(error))
    console.log(error);
  }
}

export async function createUser(userData) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("user created\n", res.data);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserData(userData, token) {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCredits(token) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/credits`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getAllBlocs = (token) => async (dispatch) => {
  try {
    dispatch(getAllBlocsRequest())
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/blocs`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }
    );

    dispatch(getAllBlocsSuccess(data));
    // return res.data;
  } catch (error) {
    dispatch(getAllBlocsFail(error));
    console.log(error);
  }
}

export const createBloc = (blocData, token) => async (dispatch) => {
  try {
    dispatch(createBlocRequest());
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`,
      blocData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(createBlocSuccess(data))
    setCookie("blocId", data.blocId)
  } catch (error) {
    if(error.response.status === 400){
      dispatch(createBlocFail("Bloc Limit Exceeded"));
    }
    if(error.response.status === 422){
      dispatch(createBlocFail("Please enter a valid bloc name"));
    }
    console.log(error);
  }
}

export const getBlocData = (token, blocId) => async (dispatch) => {
  try {
    dispatch(getBlocRequest())
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "BLOC-ID": blocId,
        },
        cache: "no-cache",
      }
    );

    dispatch(getBlocSuccess(data));
    // return res.data;
  } catch (error) {
    dispatch(getBlocFail(error.response.data.detail));
    console.log(error.response.data.detail);
  }
}

export const getPublicBlocData = (blocId) => async (dispatch) => {
  try {
    dispatch(getPublicBlocRequest())
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/public`,
      {
        headers: {
          "Content-Type": "application/json",
          "BLOC-ID": blocId,
        },
        cache: "no-cache",
      }
    );

    dispatch(getPublicBlocSuccess(data));
  } catch (error) {
    dispatch(getPublicBlocFail(error.response));
  }
}

export const updateBloc = (token, blocId, blocData) => async (dispatch) => {
  try {
    dispatch(updateBlocRequest());
    const {data} = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`,
      blocData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "BLOC-ID": blocId,
        },
      }
    );

    dispatch(updateBlocSuccess(data));
  } catch (error) {
    dispatch(updateBlocFail(error.response.data.detail));
  }
}

export const deleteBloc = (token, blocId) => async (dispatch) => {
  try {
    dispatch(deleteBlocRequest());
    const {data} = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "BLOC-ID": blocId,
        },
      }
    );

    dispatch(deleteBlocSuccess(data));
    dispatch(refreshBloc())
  } catch (error) {
    console.log(error);
    dispatch(deleteBlocFail(error.response.data.detail));
    console.log('token:- ', token);
    console.log('blocId:- ', blocId);
  }
}

export const uploadFile = (fileData, formData, config) => async (dispatch) => {
  try {
    dispatch(uploadFileRequest());
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/upload-file`,
      formData,
      config
    );
    // console.log("success\n", res.data);
      const final = {integrationId: data.integrationId, file: fileData.file, name: fileData.name, size: fileData.size, percentCompleted: fileData.percentCompleted }
      console.log("success\n", final);

    dispatch(uploadFileSuccess({integrationId: data.integrationId, file: fileData.file, name: fileData.name, size: fileData.size, percentCompleted: fileData.percentCompleted }));
    dispatch(setPercentCompletedFile({name: fileData.name, percentCompleted: 100}));
  } catch (error) {
    dispatch(uploadFileFail(error));
    console.log(error);
  }
}

export const uploadFile2 = (ind, formData, blocId, token) => async (dispatch) => {
  try {
    dispatch(uploadFileRequest2());
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/upload-file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "BLOC-ID": blocId,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setPercentCompleted2({ind: ind, percentCompleted: percentCompleted}));
        }
      }
    );

    dispatch(setPercentCompleted2({ind: ind, percentCompleted: 100}));
    dispatch(uploadFileSuccess2(data));
  } catch (error) {
    dispatch(uploadFileFail2(error));
    console.log(error);
  }
}

export const uploadNotionFile = (ind, fileData, formData, blocId, token) => async (dispatch) => {
  try {
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/add-notion`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "BLOC-ID": blocId,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setPercentCompleted({ind: ind, percentCompleted: percentCompleted}));
        }
      }
    );

    dispatch(setPercentCompleted({ind: ind, percentCompleted: 100}));
  } catch (error) {
    dispatch(uploadFileFail(error));
    console.log(error);
  }
}

export const addWebsites = (token, blocId, websiteData) => async (dispatch) => {
  try {
    dispatch(addWebsitesRequest());
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/add-website`,
      websiteData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "BLOC-ID": blocId,
        },
      }
    );

    dispatch(addWebsitesSuccess(data));
    dispatch(getAllIntegrationOfBloc(blocId, token))
  } catch (error) {
    console.log(error);
    if(error.message === 'Network Error'){
      showNotification("error", "Something went wrong while adding website. Please try again later")
    }
    dispatch(addWebsitesFail(error.response));
  }
}

export const listWebPages = (token, url) => async (dispatch) => {
  try {
    dispatch(listWebPagesRequest());
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/list-webpages?url=${url}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(listWebPagesSuccess(data));
  } catch (error) {
    dispatch(listWebPagesFail(error.message));
    if(error.message === 'Network Error'){
      showNotification("warning", "Please enter a valid URL")
    }
  }
}

export const getAllIntegrationOfBloc = (blocId, token) => async (dispatch) =>{
  try {
    dispatch(getAllIntegrationsRequest());
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/integrations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "BLOC-ID": blocId
        },
      }
    );
    dispatch(getAllIntegrationsSuccess(data));
  } catch (error) {
    dispatch(getAllIntegrationsFail(error));
    console.log(error);
  }
}

export const deleteIntegration = (integrationId) => async (dispatch) =>{
  try {
    dispatch(deleteIntegrationRequest());
    const {data} = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/integration`,
      {
        headers: {
          "Content-Type": "application/json",
          "INTEGRATION-ID": integrationId
        },
      }
    );
    
    dispatch(deleteIntegrationSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(deleteIntegrationFail(error));
  }
}

export async function blocExists(blocId){
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/exists`, {
      headers:{
        'BLOC-ID': blocId
      },
    });
    console.log(blocId);
    
    return res.data;
  }
  catch (error) {
    console.log('error in bloc exists api', error);
  }
}

export async function getPublicChatId(blocId){
  try{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-public-chatId`, {
      headers:{
        'BLOC-ID': blocId
      },
    });

    return res.data;

  } catch (error) {
    console.log('error in get public chat id api', error);
  }
}

export const getPrivateChatId = (token, blocId) => async (dispatch) =>{
  try{
    dispatch(getPrivateChatIdRequest())
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-chatId`, {
      headers:{
        'BLOC-ID': blocId,
        'Authorization': `Bearer ${token}`
      },
    });

    dispatch(getPrivateChatIdSuccess(data.chatId));
    setCookie("chatId", data.chatId)

  } catch (error) {
    dispatch(getPrivateChatIdFail(error));
    console.log('error in get private chat id api', error);
  }
}
