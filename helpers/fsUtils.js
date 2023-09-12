const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 * Function to write data to the JSON file given a destination and some content
 * @param {string} destination The file you want to write to.
 * @param {object} content The content you want to write to the file.
 * @returns {Promise<void>} A promise that resolves when the write operation is complete.
 */
const writeToFile = (destination, content) => {
  return util.promisify(fs.writeFile)(destination, JSON.stringify(content, null, 4));
};

/**
 * Function to read data from a given file and append some content
 * @param {object} content The content you want to append to the file.
 * @param {string} file The path to the file you want to save to.
 * @returns {Promise<void>} A promise that resolves when the append operation is complete.
 */
const readAndAppend = async (content, file) => {
  try {
    const existingData = await readFromFile(file);
    const parsedData = JSON.parse(existingData);
    parsedData.push(content);
    await writeToFile(file, parsedData);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it elsewhere, e.g., in route handlers
  }
};

module.exports = { readFromFile, writeToFile, readAndAppend };
