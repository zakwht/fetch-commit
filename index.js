const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require("node-fetch")
const { promises: { writeFile } } = require("fs") 
const { exec } = require('@actions/exec');
const bot = require("./profile.json")

const main = async () => {
  const url = core.getInput("url");
  const path = core.getInput("path");
  const message = core.getInput("message");
  const headers = core.getInput("headers");

  core.info(headers)

  const body = await fetch(url).then(res => res.text())
  await writeFile(path, JSON.stringify(body, null, 2))
  core.info(body)

  exec(`git config --local user.email "${bot.email}"`)
  exec(`git config --local user.name "${bot.name}"`)
  exec(`git add ${path}`)
  const code = await exec(`git diff --cached --quiet ${path}`, undefined, {
    ignoreReturnCode: true
  })
  if (code) exec(`git commit -m "${message}"`)
  exec(`git push`)
  exec('echo ABC!');

  core.info('gittyyy up cowboy!')

}

try {
  main()
} catch (error) {
  core.setFailed(error.message);
}


/*

  git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
  git config --local user.name "github-actions"
  git add linguist.yml linguist.json
  git diff-index --quiet HEAD || echo "diff=true" >> $GITHUB_OUTPUT 
  git diff-index --quiet HEAD || git commit -m "Update data"
  git push
*/


// - github actions for fetch and commit.
//     - params: fetch url, path (file to print), GH token, headers (auth, etc)