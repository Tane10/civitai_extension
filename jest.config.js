/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  verbose: true, // Display detailed test results
  collectCoverage: true, // Collect code coverage info
  coverageDirectory: "coverage", // Where to output coverage reports
  coverageReporters: ["text", "lcov"], // Types of reports
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
