import axios = require('axios');
import { setAuthTokenCookie } from "./cookieService";
import { Response } from "express";
import { AxiosResponse, AxiosError } from "axios";
import { getBaseAxiosRequestConfig, HTTP_POST, makeAPICall } from '../config/axiosConfig';
import { CMS_API_URL } from '../properties';


export const register = async (res: Response, username: string, email: string, password: string): Promise<void> => {
  
  const url: string = CMS_API_URL + '/auth/local/register';

  // Request API.

  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_POST, url);
  
   axiosConfig.data = {
    username: username,
    email: email,
    password: password
  };

  await makeAPICall(axiosConfig)
    .then((response: AxiosResponse) => {
      // Handle success.
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setAuthTokenCookie(res, response.data.jwt);
    })
    .catch((error: AxiosError) => {
      // Handle error.
      console.log('An error occurred:', error.message);
      throw error;
    });
};

export const login = async (res: Response, identifier: string, password: string): Promise<void> => {
  const url: string = CMS_API_URL + '/auth/local';
  // Request API.

  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_POST, url);

  axiosConfig.data = {
    identifier: identifier,
    password: password
  };

  await makeAPICall(axiosConfig)
    .then((response: AxiosResponse) => {
      // Handle success.
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setAuthTokenCookie(res, response.data.jwt);
    })
    .catch((error: AxiosError) => {
      // Handle error.
      console.log('An error occurred:', error.message);
      throw error;
    });
};
