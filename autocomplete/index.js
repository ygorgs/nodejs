const express = require("express");
var fs = require("fs");
var dictionary = fs
  .readFileSync("/usr/share/dict/words")
  .toString()
  .split("\n");

function autocomplete(prefix) {
  return dictionary.filter((word) =>
    isPrefix(prefix.toLowerCase(), word.toLowerCase())
  );
}

function isPrefix(prefix, word) {
  if (word.length < prefix.length) {
    return false;
  }
  for (let i = 0; i < prefix.length; i++) {
    if (prefix[i] != word[i]) {
      return false;
    }
  }
  return true;
}

const app = express();
const port = 3000;

app.get("/autocomplete/:prefix", (req, res) => {
  const prefix = req.params.prefix;
  const resultList = autocomplete(prefix);
  res.send(resultList);
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
