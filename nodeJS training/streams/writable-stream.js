const fs = require('fs');

const writeStream = fs.createWriteStream('./output.txt', {
    encoding: 'utf-8',
});

writeStream.write('Hello!\n');
writeStream.write('My name is Pesho!\n');

writeStream.end();

