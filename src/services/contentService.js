const axios = require("axios");
const fs = require("fs");

exports.getHomePages = async function () {
    console.log(process.env.MOCK_API_RESPONSES)
    if (process.env.MOCK_API_RESPONSES !== true) {
        console.log("api_path")
        const url = process.env.CMS_API + "/home-pages";
        return await axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data);
                return response.data;
            }).catch(function (error) {
                // handle error
                console.log(error);
                throw error;
            })
    } else {
        try {
            const rawResponse = fs.readFileSync("mockApiResponses/homepage.json", 'utf-8');
            const response = JSON.parse(rawResponse);
            return response;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
