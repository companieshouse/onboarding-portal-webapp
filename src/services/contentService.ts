import axios = require('axios');
import fs = require('fs');
import { AxiosError, AxiosResponse } from "axios";
import { getBaseAxiosRequestConfig, HTTP_GET, makeAPICall } from '../config/axiosConfig';
import { Homepage } from '../types/homepage';
import { CMS_API_URL, MOCK_API_RESPONSES } from '../utils/properties';

export const getHomePages = async (): Promise<Homepage> => {
  if (MOCK_API_RESPONSES !== 'true') {
    console.log('api_path');
    const url: string = CMS_API_URL + '/home-pages';
    
  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_GET, url);
  
    return await makeAPICall(axiosConfig)
      .then(function (response: AxiosResponse) {
        // handle success
        console.log(response.data);
        return response.data as Homepage;
      }).catch(function (error: AxiosError) {
        // handle error
        console.log('An error occurred:', error.message);
        throw error;
      });
  } else {
    try {
      const rawResponse = fs.readFileSync('mockApiResponses/homepage.json', 'utf-8');
      return JSON.parse(rawResponse);
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  }
};
