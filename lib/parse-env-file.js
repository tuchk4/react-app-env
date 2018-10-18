const fs = require('fs');

const EXPECT_VARIABLES = ['PORT', 'NODE_PATH'];

const parseEnvFile = file => {
  if (!fs.existsSync(file)) {
    throw new Error(`env file "${file}" does not exist`);
  }

  const content = fs.readFileSync(file).toString();

  return content.split(/\r|\n/).reduce((variables, row) => {

    const parts = [row.substring(0,row.indexOf("=")),row.substring(row.indexOf("=")+1)];

    if (parts[0] && parts[1]) {
      let varName = parts[0].trim();

      if (varName.indexOf(' ') !== -1) {
        throw new Error(
          `spaces are not allowed at evn var names. "${varName}"`
        );
      }

      if (EXPECT_VARIABLES.indexOf(varName) === -1) {
        varName = `REACT_APP_${varName}`;
      } else {
        varName = varName;
      }

      variables[varName] = parts[1].trim();
    }

    return variables;
  }, {});
};

module.exports = parseEnvFile;
