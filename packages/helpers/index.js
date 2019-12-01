const fs = require('fs');
const path = require('path');

exports.getTextFile = (filename) =>
  new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(path.dirname(require.main.filename), filename),
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data.toString());
      }
    );
  });
