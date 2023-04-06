# Fetch and Commit Action

This action fetches a file and commits its contents to the repository. 

## Inputs

### `url`

**Required** The URL of the file to fetch

### `path`

**Required** The directory path to print the file contents

### `message`

**Optional** The commit message

**Default** `"Update data"`

### `headers`

**Optional** Headers for the fetch request (stringified Object intializer)

## Outputs

### `diff`

Boolean: whether or not the file contents were updated

## Example usage

Basic usage: 

```yaml
name: Run test action
uses: ./
with:
  url: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1
  path: APOD.json
  message: Update JSON
```



```yaml
name: update-data
on:
  schedule: # run daily at midnight
    - cron: 0 0 * * *
jobs:
  update:
    runs-on: ubuntu-latest
    outputs:
      diff: ${{ steps.fetch.outputs.diff }}
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Run test action
      id: fetch
      uses: ./
      with:
        url: https://raw.githubusercontent.com/languages.yml
        path: linguist.yml
        headers: '{"Content-Type": "application/x-yaml"}'

  deploy:
    runs-on: ubuntu-latest
    needs: update
    if: needs.update.outputs.diff
    steps:
    - name: Checkout
      uses: actions/checkout@v3
```


