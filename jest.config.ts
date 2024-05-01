module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'jest-environment-jsdom',

  transformIgnorePatterns: ['/node_modules/', '\\.scss$'],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/__mocks__/styleMock.js',
  },
};
