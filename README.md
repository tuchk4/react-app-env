# Deprecated

CRA supports multiple `.env`  configs out of the box [Feature/different env config files #1343](https://github.com/facebookincubator/create-react-app/pull/1344)

Docs - [Adding Development Environment Variables](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env)


----



Run [create-react-app](https://github.com/facebookincubator/create-react-app) application with env variables.

## Create react app PR

There is Issue and PR to create-react-app repository to support different env configs.
https://github.com/facebookincubator/create-react-app/issues/1343


## Better Use [dotenv](https://www.npmjs.com/package/dotenv)

*create-react-app* read variables from `.env` config out of the box. 
But if you need to read from custom config - update npm scripts:

```
"scripts": {
  "start": "node -r dotenv/config ./node_modules/.bin/react-scripts start dotenv_config_path=development.env",
  "build": "node -r dotenv/config ./node_modules/.bin/react-scripts build dotenv_config_path=production.env"
}
```

## [React app env](https://github.com/tuchk4/react-app-env)

Cozy and cross OS *create-react-app* application runner with environment variables.

Default environment files:

* *start* and *test* script - *development.env*
* *build* script - *production.env*

---

Environment file example *./development.env*

```
GOOGLE_CLIENT_ID = XXX_YYY_ZZZ
API_PROTOCOL = http:
API_HOST = localhost:9876
API_PREFIX = api
API_SECURITY_TOKEN = access_token

NODE_PATH = src/scripts
PORT = 9001
```
*react-app-env* will automatically add `REACT_APP` prefix to each env variable except:

* PORT - dev server port
* NODE_PATH - directory name to be resolved to the current directory as well as its ancestors, and searched for modules. It is [resolve.modulesDirectories](https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories) for webpack. More details at node official doc ["Loading from the global folders"](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders)

With this environment file defined above:

```
react-app-env start
```

equals to

```
cross-env REACT_APP_GOOGLE_CLIENT_ID=XXX_YYY_ZZZ REAC_APP_API_PROTOCOL=http: REACT_APP_API_HOST=localhost:9876 REACT_APP_API_PREFIX=api REACT_APP_API_SECURITY_TOKEN=acess_token NODE_PATH=src/scripts PORT=9001 react-scripts start
```

Use environment variables:

```js
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const apiHost = process.env.REACT_APP_API_HOST;
```

### Custom env files

* use *--env-file* flag

```
react-app-env --env-file=configs/local.env start
```


### Install

```
npm i --save-dev react-app-env
```

### npm scripts

```
"scripts": {
  "start": "react-app-env start",
  "build": "react-app-env build",
  "test": "react-app-env test",
}
```
