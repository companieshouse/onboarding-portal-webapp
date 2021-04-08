import axios = require('axios');
import { setAuthTokenCookie } from "./cookieService";
import { Response } from "express";
import { AxiosResponse, AxiosError } from "axios";
import { getBaseAxiosRequestConfig, HTTP_GET, HTTP_POST, makeAPICall } from '../config/axiosConfig';
import { token } from 'morgan';


export const register = async (res: Response, username: string, email: string, password: string): Promise<void> => {
  
  const url: string = process.env.CMS_API + '/auth/local/register';

  // Request API.

  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_POST, url);
  
  const data = {
    username: username,
    email: email,
    password: password
  };

  await (await makeAPICall(axiosConfig)).data
    .then((response: AxiosResponse) => {
      // Handle success.
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setAuthTokenCookie(res, response.data.jwt);
    })
    .catch((error: AxiosError) => {
      // Handle error.
      console.log('An error occurred:', error.response);
      throw error;
    });
};

export const login = async (res: Response, identifier: string, password: string): Promise<void> => {
  const url: string = process.env.CMS_API + '/auth/local';
  // Request API.

  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_POST, url);

  const data = {
    identifier: identifier,
    password: password
  };

  await (await makeAPICall(axiosConfig)).data
    .then((response: AxiosResponse) => {
      // Handle success.
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setAuthTokenCookie(res, response.data.jwt);
    })
    .catch((error: Error) => {
      // Handle error.
      console.log('An error occurred:', error);
      throw error;
    });
};
