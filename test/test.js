/** @format */

const { FandomClient } = require("../dist/index");

const client = new FandomClient("wingsoffire");

const fs = require("fs");

if (!fs.existsSync("test/config.json")) {
  console.log("Please create a config.json file in the test folder");
  process.exit(1);
}

const file = fs.readFileSync("./test/config.json").toString();

const { username, password } = JSON.parse(file);

client
  .login({
    username,
    password
  })
  .then(console.log);
