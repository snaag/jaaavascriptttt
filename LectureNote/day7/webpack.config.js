var path = require("path");

module.exports = {
  entry: "./src/index.js", // 빌드할 코드
  output: {
    filename: "bundle.js", // 빌드한 코드의 결과물
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{}]
  }
};
