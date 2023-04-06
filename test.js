const fetch = require("node-fetch")

fetch("https://www.randomnumberapi.com/api/v1.0/random").then(x => x.json()).then(x => console.log(x))

console.log('b')