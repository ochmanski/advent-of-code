const fs = require('fs');
const path = require('path');

const getTextFileUnsafe = (filename) =>
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

const getTextFile = async (filename) => {
  let data = '';

  try {
    data = await getTextFileUnsafe(filename);
  } catch (e) {
    console.log(e);
  }

  return data;
};

module.exports = { getTextFileUnsafe, getTextFile };
