import { defineConfig } from "@playwright/test";

export default defineConfig({
  // webServer: {
  //   command: "npm run server",
  //   port: 3000,
  // },
  webServer: {
    command: "node ch16/ex11/index.js",
    port: 8000,
  },
  use: {
    headless: false,
    // 会社 PC は拡張機能オフで起動できない
    launchOptions: { ignoreDefaultArgs: ["--disable-extensions"] },
  },
  testDir: ".",
  testMatch: /(.+\.)?test\.[jt]s/,
  workers: 1,
  maxFailures: 1,
});
