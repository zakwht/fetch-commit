const core = require('@actions/core');
const github = require('@actions/github');
const { writeFileSync } = require("fs");

try {

  // https://www.randomnumberapi.com/api/v1.0/random
  const url = core.getInput("url");
  const path = core.getInput("path");

  fetch(url).then(res => res.text()).then(body => writeFileSync(path, JSON.stringify(body, null, 2)))

  // console.log(url, path)
  core.debug(url, path)
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
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