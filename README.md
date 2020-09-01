# Dawn of NodeTS API

Understanding NodeTS API with MSSQL from its dawn. This project highlights the initial setup for NodeTS API with MSSQL as data source. An architectural setup of NodeTS API.

#### Initialize NPM
```
npm init
```

#### Install Typescript Compiler Globally
```
npm i -g typescript
```
#### Typescript Initialize
```
tsc --init
```
#### Updating TS Configuration
1. Update `target` from "es5" to "es6"
2. Update the `outDir` from './' to './dist' which will contains the compiled JS files
3. Update the `rootDir` from './' to './src' which will contains TS files
4. Uncomment `moduleResolution` to "node"
```
{
    "compilerOptions": {
        "target": "es6",
        "outDir": "./dist",
        "rootDir": "./src",
        "moduleResolution": "node"
    }
}
```

#### Install Express
Run the following command to install express as dependencies
```
npm i express 
npm i mssql 
npm i dotenv 
npm i compression 
npm i cors 
npm i winston
npm i uuid
npm i jsonwebtoken
```

#### Install Dev Dependencies 
Run the following command to install typescript, ts-node, nodemon, @types/node, @types/express and @types/mssql as dev dependency (we don't need these for production we need it for development)
```
npm i -D typescript 
npm i -D ts-node-dev 
npm i -D @types/node 
npm i -D @types/express 
npm i -D @types/mssql 
npm i -D @types/cors 
npm i -D @types/compression
npm i -D @types/uuid
npm i -D @types/jsonwebtoken
```
The `-D` above is for dev-dependencies.

#### Update Package JSON Script
Update the `package.json` script command as follows:
```
"scripts": {
    "start": "node dist/server",
    "build": "tsc -p .",
    "watch": "ts-node-dev --respawn --transpile-only ./src/server.ts"
}
```

#### Unit Testing using JEST
For unit testing and test coverage we are using JEST framework. Install following dev dependencies for JEST.
```
npm i -D jest @types/jest ts-jest
```
Initialize your jest with:
```
jest --init
```
Do following changes in jest.config.js file
```
module.exports = {
  clearMocks: true,
  coverageDirectory: "./test-results/coverage",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: [
    "js",
    "ts"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/src/**/*.spec.(ts)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};
```
Name your unit test files as "*.spec.ts".

The command is created to run JEST is in package.json so you have to simply run:
```
npm test
// or
npm t
```
The command in package.json is as follows:
```
jest --forceExit --coverage --verbose --detectOpenHandles
```

#### Overview of JEST
To simply run your jest unit test cases execute following command:
```
jest
```
The above will show high level detail of the executed or not executed test suits.

Verbose: Will provide details of each individual test cases.
```
jest --verbose
```

Coverage: Will provide code coverage. JEST by default uses `istanbul` to show test coverage reports.
```
jest --coverage
```

#### Linting Setup
For linting we are using tslint. Install following dev dependencies for linting.
```
npm i -D tslint
```
Add the `tslint.json` lint configuration file as follows:
```
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {},
    "rulesDirectory": []
}
```