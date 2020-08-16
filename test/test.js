// eslint-disable-next-line @typescript-eslint/no-var-requires
const fixtureGenerator = require('../dist/index').default;
const path = require('path');

const generateRequests = () => {
  const requests = [];

  for (let i = 0; i < 10; i += 1) {
    requests.push({
      name: i,
      method: 'get',
      url: `/${i + 1}/`,
    });
  }

  return {
    baseURL: 'https://swapi.dev/api/people',
    requests,
  };
};

fixtureGenerator({
  requestConfig: generateRequests(),
  outDir: path.resolve(__dirname, 'fixtures'),
});
