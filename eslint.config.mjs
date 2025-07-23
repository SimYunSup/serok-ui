import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import storybookEslint from "eslint-plugin-storybook";

export default [
  ...typescriptEslint.config(
    {
      ignores: ["**/stories/**", "eslint.config.mjs"],
      files: ["lib/**/*"],
    },
    eslint.configs.recommended,
    typescriptEslint.configs.recommended,
    typescriptEslint.configs.stylistic,
    {
      files: "lib/stories/**/*",
      extends: storybookEslint.configs["flat/recommended"],
    }
  )
];
