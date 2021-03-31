const axios = require('axios');
const { setAuthTokenCookie } = require('./cookieService');

exports.register = async function(res, username, email, password) {
  const url = process.env.CMS_API + '/auth/local/register';

  // Request API.
  // Add your own code here to customize or restrict how the public can register new users.
  await axios
    .post(url, {
      username: username,
      email: email,
      password: password,
    })
    .then(response => {
      // Handle success.
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setAuthTokenCookie(res, response.data.jwt);
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
      throw error;
    });
}

exports.login = async function(res, identifier, password) {
  const url = process.env.CMS_API + '/auth/local';
  // Request API.
  await axios
    .post(url, {
      identifier: identifier,
      password: password,
    })
    .then(response => {
      // Handle success.
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setAuthTokenCookie(res, response.data.jwt);
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
      throw error;
    });
}
