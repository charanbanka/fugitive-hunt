module.exports = {
  testEnvironment: "node", // Use the Node.js environment for testing
  testMatch: ["**/__tests__/**/*.test.js"], // Match test files in the "__tests__" folder
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    "**/*.js", // Include all JavaScript files
    "!**/node_modules/**", // Exclude node_modules
    "!**/__tests__/**", // Exclude test files
    "!**/coverage/**", // Exclude the coverage folder
    "!jest.config.js", // Exclude the Jest configuration file
  ],
  coverageDirectory: "coverage", // Output coverage reports to the "coverage" folder
};
