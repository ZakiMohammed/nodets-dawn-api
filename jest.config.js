// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

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
