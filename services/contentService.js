const axios = require("axios");

exports.getHomePages = async function () {
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

}
