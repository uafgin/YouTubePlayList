module.exports = {
  roots: ["<rootDir>/src"],
  testRegex: "(/.*\\.test)\\.(ts|tsx)$",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
