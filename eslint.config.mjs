import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default [
  ...typescriptEslint.config(
    {
      ignores: ["eslint.config.mjs"],
      files: [
        "lib/**/*.ts",
        "lib/**/*.tsx",
        "docs/**/*.ts",
        "docs/**/*.tsx",
        "vite.config.ts",
      ],
      plugins: {
        "@stylistic": stylistic,
      },
      rules: {
        "@stylistic/indent": ["error", 2],
        "@stylistic/quotes": ["error", "single", { "avoidEscape": true }],
        "@stylistic/semi": ["error", "always"],
      },
    },
    eslint.configs.recommended,
    typescriptEslint.configs.recommended,
  )
];
