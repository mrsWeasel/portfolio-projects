module.exports = {
  roots: ["<rootDir>/src/"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "@/services/(.*)": "<rootDir>/src/services/$1",
  },
}
