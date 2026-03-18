module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.spec.json'
    }]
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  moduleNameMapper: {
    '^rxjs/ajax$': '<rootDir>/node_modules/rxjs/dist/cjs/ajax/index.js',
    '^rxjs$': '<rootDir>/node_modules/rxjs/dist/cjs/index.js'
  }
};
