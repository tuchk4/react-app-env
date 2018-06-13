const path = require('path');
const spawn = require('cross-spawn');

const argv = require('yargs').argv;
const parseEnvFile = require('./parse-env-file');

const reactScriptsCommand = argv._[0];

let defaultEnvFile = 'development.env';
if (reactScriptsCommand == 'build') {
  defaultEnvFile = 'production.env';
}

const rest = [];
if (reactScriptsCommand === 'test') {
  rest.push('--env=jsdom');
}

const envFile = argv.envFile || defaultEnvFile;
const variables = parseEnvFile(path.resolve(envFile));

const env = Object.keys(variables).reduce((env, variable) => {
  env.push(`${variable}=${variables[variable]}`);
  return env;
}, []);

spawn('cross-env', [...env, 'react-scripts', reactScriptsCommand, ...rest], {
  stdio: 'inherit',
});
