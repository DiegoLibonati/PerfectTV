export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  globalSetup: "<rootDir>/tests/jest.globalSetup.ts",
  globalTeardown: "<rootDir>/tests/jest.globalTeardown.ts",
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/app/$1",
  },
};
