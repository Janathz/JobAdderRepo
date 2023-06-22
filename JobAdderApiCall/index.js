const axios = require('axios');

const clientId = 'CLIENT_ID';
const clientSecret = 'CLIENT_SECRET';
const redirectUri = 'REDIRECT_URI';
const authorizationEndpoint = 'https://id.jobadder.com/connect/authorize';
const tokenEndpoint = 'https://id.jobadder.com/connect/token';

module.exports = async function (context, req) {
  const code = req.query.code;

  if (!code) {
    const scope = 'read';
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
    const tokenResponse = await axios.post(tokenEndpoint, {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    });

    const accessToken = tokenResponse.data.access_token;
    const apiBaseUrl = tokenResponse.data.api;

    const companyId = 123;
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
