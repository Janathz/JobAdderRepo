const axios = require('axios');

const baseUrl = 'https://apps.jobadder.com/widgets/V1/Jobs/RenderJobList';
const queryParams = {
  callback: 'jQuery36405312335243209085_1687376374712',
  key: 'AU5_mxq3ck72swpuphf5km2dri54am',
  jobsPerPage: 6,
  showHotJobsOnly: false,
  titleIsLink: true,
  showDatePosted: true,
  datePostedFormat: '{0}',
  dateFormat: 'dd MMMM yyyy',
  showClassifications: true,
  classificationsToExclude: '',
  showSalary: false,
  salaryFormat: '{0}',
  includeSalaryText: false,
  showJobReference: false,
  jobReferenceFormat: '{0}',
  alwaysShowPager: true,
  showPagerSummary: true,
  pagerGroupSize: 4,
  scrollOnPageChange: false,
  animateScrollOnPageChange: false,
  readMoreText: 'More info',
  noJobsContent: 'There are no jobs matching your criteria. Please try a broader search.',
  renderPoweredByJobAdder: false,
  classificationIDs: 215076,
  keywords: '',
  pageNumber: 1,
  _: Date.now() // Adding a timestamp to make the request URL unique
};

const queryString = Object.entries(queryParams)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&');

const apiUrl = `${baseUrl}?${queryString}`;

module.exports = async function run(context, req) {
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
    // Handle the response data here
    context.res = {
      status: 200,
      body: response.data
    };
  } catch (error) {
    console.error(error);
    // Handle the error here
    context.res = {
      status: 500,
      body: 'An error occurred while accessing the API.'
    };
  }
};
