import axios = require('axios');
import fs = require('fs');
import { AxiosError, AxiosResponse } from "axios";
import { getBaseAxiosRequestConfig, HTTP_GET, makeAPICall } from '../config/axiosConfig';

export const getHomePages = async (): Promise<any> => {
  if (process.env.MOCK_API_RESPONSES !== 'true') {
    console.log('api_path');
    const url: string = process.env.CMS_API + '/home-pages';
    
  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_GET, url);
  
    return await makeAPICall(axiosConfig)
      .then(function (response: AxiosResponse) {
        // handle success
        console.log(response.data);
        return response.data;
      }).catch(function (error: AxiosError) {
        // handle error
        console.log(error);
        throw error;
      });
  } else {
    try {
      const rawResponse = fs.readFileSync('mockApiResponses/homepage.json', 'utf-8');
      return JSON.parse(rawResponse);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
