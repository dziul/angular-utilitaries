// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config

const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)', '!**/+(*.)(module|routes).spec.ts'],
  verbose: true,
  testURL: 'http://localhost:4200/',
  preset: 'jest-preset-angular',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coveragePathIgnorePatterns: ['.module.ts', 'demo/', '.(enum|model|dto).ts'],
  collectCoverageFrom: ['src/app/**/*.ts', 'src/util/**/*.ts'],
  coverageReporters: ['html', 'lcovonly'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10,
    },
    '**/*.ts': {
      //depois deletar
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },

  moduleDirectories: ['node_modules', 'src'],

  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/modules/demo/',
    '<rootDir>/src/app/modules/emp4/account/account.component.ts',
    '<rootDir>/src/app/modules/emp4/emp4.component.ts',
  ],

  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': '<rootDir>/src/testing/stubs/styles.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
};
