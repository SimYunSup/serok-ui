import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";

export default [
  ...typescriptEslint.config(
    {
      ignores: ["**/stories/**", "eslint.config.mjs"],
      files: ["lib/**/*"],
    },
    eslint.configs.recommended,
    typescriptEslint.configs.recommended,
    typescriptEslint.configs.stylistic,
  )
];
