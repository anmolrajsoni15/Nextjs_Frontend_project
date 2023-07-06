

import axios from "axios";
import { createBlocFail, createBlocRequest, createBlocSuccess, deleteBlocFail, deleteBlocRequest, deleteBlocSuccess, deleteIntegrationFail, deleteIntegrationRequest, deleteIntegrationSuccess, getAllBlocsFail, getAllBlocsRequest, getAllBlocsSuccess, getAllIntegrationsFail, getAllIntegrationsRequest, getAllIntegrationsSuccess, getBlocFail, getBlocRequest, getBlocSuccess, getPrivateChatIdFail, getPrivateChatIdRequest, getPrivateChatIdSuccess, updateBlocFail, updateBlocRequest, updateBlocSuccess } from "../Redux/features/blocSlice";
import { getUserFail, getUserRequest, getUserSuccess } from "../Redux/features/userSlice";
import { setPercentCompleted, uploadFileFail, uploadFileRequest, uploadFileSuccess } from "../Redux/features/UploadFile";
import { stringify } from "querystring";
import { setCookie } from "cookies-next";


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
    dispatch(getUserFail(error.response.data.detail))
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
    dispatch(getAllBlocsFail(error.response.data.detail));
    console.log(error.response.data.detail);
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
    dispatch(setPercentCompleted({name: fileData.name, percentCompleted: 100}));
  } catch (error) {
    dispatch(uploadFileFail(error));
    console.log(error);
  }
}

export async function addWebsites(token, url, blocId){
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/add-website?url=https://${url}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "BLOC-ID": blocId
        },
      },
    );
    return res;
  } catch (error) {
    console.log(error);
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

  } catch (error) {
    dispatch(getPrivateChatIdFail(error));
    console.log('error in get private chat id api', error);
  }
}