const axios = require('axios');
const apiKey = "ec599f6cc00e1013be51a97b8d3528a4"; // weather api key (e.g. weatherstack.com)
const defaultLocationCityCountry = "Toronto, Canada";

module.exports = async function (context, req) {
  const location = req.query.location; // To parse http query string

  context.log(`req location: ${location}`);
  const locationCityCountry = location || defaultLocationCityCountry;

  // prepare the url for axios to call weatherstack api
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${locationCityCountry}`;
  context.log(`url: ${url}`);

  try {
    // Initiate http call with weatherstack api
    const response = await axios.get(url);

    // Handle the http response
    const json = response.data;

    const responseMessage = json
      ? `This HTTP triggered function executed successfully! \n weatherstack json response is \n ${JSON.stringify(json)}`
      : "This HTTP triggered function executed successfully!!";

    context.res = {
      status: 200,
      body: responseMessage
    };
  } catch (error) {
    context.log.error(error);
    context.res = {
      status: 500,
      body: "An error occurred while executing the function."
    };
  }
};
