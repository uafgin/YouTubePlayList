import Ts from "rollup-plugin-typescript2";

export default {
  input: [
    "src/index.ts",
    "src/atoms/VideoPlayer/index.ts",
    "src/atoms/Input/index.ts",
    "src/atoms/ListItems/index.ts",
    "src/atoms/Button/index.ts",
    "src/atoms/Padding/index.ts",
    "src/atoms/Margin/index.ts",
    "src/atoms/FlexContainer/index.ts",
    "src/molecules/YouTubeList/index.ts",
  ],
  output: {
    dir: "lib",
    format: "esm",
    sourcemap: true,
  },
  plugins: [Ts()],
  preserveModules: true,
  external: ["react"],
};
