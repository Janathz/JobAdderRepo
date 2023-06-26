module.exports = async function (context, req) {
  try {
    const axios = require('axios');
    const baseUrl = 'https://apps.jobadder.com/widgets/V1/Jobs/RenderJobList';
    const queryParams = {
      callback: 'jQuery36405312335243209085_1687376374712',
      key: 'AU5_mxq3ck72swpuphf5km2dri54am',
      jobsPerPage: 100,
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
      _: Date.now()
    };

    const apiUrl = `${baseUrl}?${Object.entries(queryParams).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')}`;

    const response = await axios.get(apiUrl);
    const rawResponseData = response.data;
    const regex = /jQuery\d+\_\d+\((.*)\);/;
    const matches = regex.exec(rawResponseData);
    const jsonData = JSON.parse(matches[1]);
    const responseBody = JSON.stringify(jsonData);
    const headers = {
      'Content-Type': 'application/json'
    };

    context.res = {
      status: 200,
      body: responseBody,
      headers: headers
    };
  } catch (error) {
    context.log.error(error);

    context.res = {
      status: 500,
      body: 'An error occurred',
      headers: {
        'Content-Type': 'text/plain'
      }
    };
  }
};
