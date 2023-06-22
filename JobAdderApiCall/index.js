const axios = require('axios');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'YOUR_REDIRECT_URI';
const authorizationEndpoint = 'https://id.jobadder.com/connect/authorize';
const tokenEndpoint = 'https://id.jobadder.com/connect/token';

module.exports = async function (context, req) {
  const code = req.query.code;

  if (!code) {
    // Step 1: Redirect the user to the authorization URL
    const scope = 'read'; // Specify the desired scope(s) here
    const authUrl = `${authorizationEndpoint}?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
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
    const companyId = 123; // Replace with the actual company ID you want to retrieve jobs for
    const apiUrl = `${apiBaseUrl}/companies/${companyId}/jobs`;
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
