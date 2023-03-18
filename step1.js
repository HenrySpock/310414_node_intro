const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}

// take filename/path from command line arguments
const [, , path] = process.argv;

// call the function with the specified path argument
cat(path);
