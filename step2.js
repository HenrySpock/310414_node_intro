const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}

function webCat(url) {
  axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

const [, , arg] = process.argv;

if (arg.startsWith('http://') || arg.startsWith('https://')) {
  webCat(arg);
} else {
  cat(arg);
}