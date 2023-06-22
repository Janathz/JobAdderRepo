const axios = require('axios');

const apiUrl = 'https://apps.jobadder.com/widgets/V1/Jobs/RenderJobList?callback=jQuery36405312335243209085_1687376374712&key=AU5_mxq3ck72swpuphf5km2dri54am&jobsPerPage=6&showHotJobsOnly=false&titleIsLink=true&showDatePosted=true&datePostedFormat=%7B0%7D&dateFormat=dd%20MMMM%20yyyy&showClassifications=true&classificationsToExclude=&showSalary=false&salaryFormat=%7B0%7D&includeSalaryText=false&showJobReference=false&jobReferenceFormat=%7B0%7D&alwaysShowPager=true&showPagerSummary=true&pagerGroupSize=4&scrollOnPageChange=false&animateScrollOnPageChange=false&readMoreText=More%20info&noJobsContent=There%20are%20no%20jobs%20matching%20your%20criteria.%20Please%20try%20a%20broader%20search.&renderPoweredByJobAdder=false&classificationIDs=215076&keywords=&pageNumber=1&_=1687376374715';

axios.get(apiUrl)
  .then(response => {
    console.log(response.data);
    // Handle the response data here
  })
  .catch(error => {
    console.error(error);
    // Handle the error here
  });
