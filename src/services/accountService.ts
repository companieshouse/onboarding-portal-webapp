import axios = require('axios');
import { setAuthTokenCookie } from "./cookieService";
import fs = require('fs');
import { Response } from "express";
import { AxiosResponse, AxiosError } from "axios";
import { getBaseAxiosRequestConfig, HTTP_POST, makeAPICall } from '../config/axiosConfig';
import { CMS_API_URL, MOCK_API_RESPONSES } from '../properties';


export const register = async (res: Response, username: string, email: string, password: string): Promise<void> => {
  
  const emailValidationRegExp = /^\w+@companieshouse.gov.uk$/; // regExp literal
  
  // Check if the email is NOT a companies house email and throw an error if it isn't
  if(!email.match(emailValidationRegExp)) {
      throw new Error("Email address is not a Companies House provided email.");
  }
  const url: string = CMS_API_URL + '/auth/local/register';

  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_POST, url);
  
   axiosConfig.data = {
    username: username,
    email: email,
    password: password
  };

  await callApiAndSetCookie(axiosConfig, res);
};

export const login = async (res: Response, identifier: string, password: string): Promise<void> => {
  const url: string = CMS_API_URL + '/auth/local';

  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_POST, url);

  axiosConfig.data = {
    identifier: identifier,
    password: password
  };
  await callApiAndSetCookie(axiosConfig, res);
};

async function callApiAndSetCookie(axiosConfig:axios.AxiosRequestConfig, res: Response): Promise<void> {
  if (MOCK_API_RESPONSES === 'true') {
    mockApiAndSetCookie(res);
    return Promise.resolve();
  }
  return await makeAPICall(axiosConfig)
  .then((response: AxiosResponse) => {
    // Handle success.
    console.log(response.data);
    // console.log('User profile', response.data.user);
    // console.log('User token', response.data.jwt);
    setAuthTokenCookie(res, response.data.jwt);
    return Promise.resolve();
  })
  .catch((error: AxiosError) => {
    // Handle error.
    console.log('An error occurred:', error.message);
    throw error;
  });
}

function mockApiAndSetCookie(res: Response) {
  try {
    const rawResponse = fs.readFileSync('mockApiResponses/login.json', 'utf-8');
    const jsonResponse = JSON.parse(rawResponse);
    const jwt = jsonResponse.jwt;

    setAuthTokenCookie(res, jwt);
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}
