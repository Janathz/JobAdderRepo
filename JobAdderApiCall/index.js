const axios = require('axios');

const clientId = 'CLIENT_ID';
const clientSecret = 'CLIENT_SECRET';
const redirectUri = 'REDIRECT_URI';
const authorizationEndpoint = 'https://id.jobadder.com/connect/authorize';
const tokenEndpoint = 'https://id.jobadder.com/connect/token';

module.exports = async function (context, req) {
  const code = req.query.code;

  if (!code) {
    // Step 1: Redirect the user to the authorization URL
    const authUrl = `${authorizationEndpoint}?response_type=code&client_id=${clientId}&scope=SCOPES&redirect_uri=${redirectUri}`;
    context.res = {
      status: 302,
      headers: {
        location: authUrl
      }
    };
    return;
  }

  try {
    // Step 3: Exchange the authorization code for an access token
    const tokenResponse = await axios.post(tokenEndpoint, {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    });

    const accessToken = tokenResponse.data.access_token;
    const apiBaseUrl = tokenResponse.data.api;

    // Step 4: Use the access token to make API requests
    const apiUrl = `${apiBaseUrl}/API_ENDPOINT`;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    const apiResponse = await axios.get(apiUrl, { headers });

    context.res = {
      status: 200,
      body: apiResponse.data
    };
  } catch (error) {
    context.log.error(error);
    context.res = {
      status: 500,
      body: 'An error occurred while accessing the JobAdder API.'
    };
  }
};
