const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const logger = require('../utils/logger');

const writeIntoFile = async (file, data) => {
    fs.writeFile(file, data, (err) => {
        if (err) {
            logger.log(err, 'error');
        }
    });
}

const readFromFile = async (file) => {
// read asynchronously
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}



module.exports = { writeIntoFile, readFromFile };