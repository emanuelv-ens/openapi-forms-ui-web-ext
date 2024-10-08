import { configDotenv } from "dotenv";
import path from "node:path";
import os from "node:os";

configDotenv();
const chromePath = path.resolve(process.env.CHROME_PATH || getChromePath());
if (!chromePath) {
  throw new Error("Cannot determine the path to Google Chrome");
}

function getChromePath() {
  return {
    darwin: undefined,
    linux: undefined,
    win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  }[process.platform];
}

export default {
  run: {
    target: ["chromium"],
    chromiumBinary: chromePath,
    chromiumProfile: path.join(
      os.homedir(),
      ".web-ext-chrome-openapi-forms-ui",
    ),
    args: ["--disable-search-engine-choice-screen"],
    pref: ["extensions.ui.developer_mode=true"],
  },
};
