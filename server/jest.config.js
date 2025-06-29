module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['./**/*.test.ts'],
  globalSetup: './jest.globalsetup.js'
}