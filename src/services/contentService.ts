import axios = require('axios');
import fs = require('fs');
import { AxiosError, AxiosResponse } from "axios";
import { getBaseAxiosRequestConfig, HTTP_GET, makeAPICall } from '../config/axiosConfig';
import { Page } from '../types/page';
import { CMS_API_URL, MOCK_API_RESPONSES } from '../properties';

export const getHomePageContent = async (): Promise<Page> => {
  if (MOCK_API_RESPONSES !== 'true') {
    console.log('api_path');

    const homePageId = "home";
    const temp = await getContentForId(homePageId);
    return temp;
  } else {
    const rawResponse = fs.readFileSync('mockApiResponses/homepage.json', 'utf-8');
    return JSON.parse(rawResponse);

  }
};

export const getPageContent = async (pageId: string): Promise<Page> => {
  if (MOCK_API_RESPONSES !== 'true') {
    console.log('api_path');
    
    return await getContentForId(pageId);
  } else {
    const rawResponse = fs.readFileSync('mockApiResponses/page.json', 'utf-8');
    const jsonResponse = JSON.parse(rawResponse);
    jsonResponse["_id"] = pageId;
    jsonResponse["id"] = pageId;
    jsonResponse["page_content"] = "Page ID = " + pageId;
    return jsonResponse as Page;

  }
};

async function getContentForId(pageId: string) {
  const url = CMS_API_URL + '/pages?page_id=' + pageId;

  const axiosConfig: axios.AxiosRequestConfig = getBaseAxiosRequestConfig(
    HTTP_GET, url);

  return await makeAPICall(axiosConfig)
    .then(function (response: AxiosResponse) {
      // handle success
      console.log(response.data);
      return response.data[0] as Page;
      // return response.data as Page;
    }).catch(function (error: AxiosError) {
      // handle error
      throw error;
    });
}
