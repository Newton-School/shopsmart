import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
