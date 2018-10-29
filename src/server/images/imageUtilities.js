const fs = require('fs');

fs.readdir(__dirname + './assets/thumbnails/', (err, items) => {
    console.log(items)
    console.warn(err);
});