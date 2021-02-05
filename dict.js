var _ = require('underscore');
fs = require('fs');


const writeStream = fs.createWriteStream('cleanedDict.js');

var clean = _.uniq(dictionary);
// write each value of the array on the file breaking line
writeStream.write(`const cleanedDict = [\n`)
clean.forEach(value => writeStream.write(`'${value}',\n`));
writeStream.write(`]\n`)

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
});

// handle the errors on the write process
writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
});

// close the stream
writeStream.end();