// scripts/csvToJson.js

const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('final.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFileSync('dog_breeds.json', JSON.stringify(results, null, 2));
    console.log('CSV file successfully converted to JSON');
  });