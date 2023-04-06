const core = require("@actions/core");
const fetch = require("node-fetch");
const { writeFile } = require("fs");
const { exec } = require("@actions/exec");
const bot = require("./profile.json");

const main = async () => {
  const url = core.getInput("url");
  const path = core.getInput("path");
  const message = core.getInput("message");
  const headers = core.getInput("headers") || {};

  const body = await fetch(url, { headers }).then((res) => res.text());
  await writeFile(path, JSON.stringify(body, null, 2));
  core.info(body);

  exec(`git config --local user.email "${bot.email}"`);
  exec(`git config --local user.name "${bot.name}"`);
  exec(`git add ${path}`);
  const diffcode = await exec(`git diff --cached --quiet ${path}`, undefined, {
    ignoreReturnCode: true
  });
  if (diffcode) exec(`git commit -m "${message}"`);
  exec(`git push`);

  core.setOutput("diff", Boolean(diffcode));
};

try {
  main();
} catch (error) {
  core.setFailed(error.message);
}
