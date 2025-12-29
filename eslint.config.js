import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  {
    ignores: ["dist", "coverage"],
  },
  // Configuration pour les fichiers React (src/)
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // React
      "react/react-in-jsx-scope": "off", // React 17+ n'en a plus besoin
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error", // Détecte l'utilisation des variables dans JSX
      // JS
      eqeqeq: ["error", "always"],
      "no-console": [
        "warn",
        { allow: ["warn", "error", "log", "group", "groupEnd", "table"] },
      ],
      "no-debugger": "error",
      "prefer-const": "warn",
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
    settings: {
      react: {
        version: "detect", // Détecte automatiquement la version de React
      },
    },
  },
  // Configuration pour les scripts Node.js (scripts/, fichiers racine)
  {
    files: ["scripts/**/*.js", "*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      eqeqeq: ["error", "always"],
      "no-console": "off", // Autoriser console dans les scripts
      "no-debugger": "error",
      "prefer-const": "warn",
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },
];
