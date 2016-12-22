const os = require('os');
const fs = require('fs');

const EXPECT_VARIABLES = [
  'PORT',
  'NODE_PATH'
];

const parseEnvFile = (file) => {
  if (!fs.existsSync(file)) {
    throw new Error(`env file "${file}" does not exist`);
  }

  const content = fs.readFileSync(file).toString();

  return content.split(os.EOL).reduce((variables, row) => {
    const parts = row.split('=');

    if (parts[0] && parts[1]) {
      let varName = null;
      if (EXPECT_VARIABLES.indexOf(parts[0]) === -1) {
        varName = `REACT_APP_${parts[0]}`.replace(/\s/g, '');
      } else {
        varName = parts[0].replace(/\s/g, '');
      }

      variables[varName] = parts[1];
    }

    return variables;
  }, {});
};

module.exports = parseEnvFile;
