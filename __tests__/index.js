const path = require('path');
const parseEnvFile = require('../lib/parse-env-file');

describe('parse env variables', () => {
  it('should parse env file', () => {

    const envFile =path.resolve(__dirname, './variables.env');

    const variables = parseEnvFile(envFile);

    expect(variables).toEqual({
      "REACT_APP_GOOGLE_CLIENT_ID": "XXX_YYY_ZZZ",
      "REACT_APP_API_PROTOCOL": "http:",
      "REACT_APP_API_HOST": "localhost:9876",
      "REACT_APP_API_PREFIX": "api",
      "REACT_APP_API_SECURITY_TOKEN": "access_token",

      "NODE_PATH": "/src",
      "PORT": "9001"
    });
  });
});
