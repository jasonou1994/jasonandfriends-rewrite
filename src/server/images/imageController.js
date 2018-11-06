const Image = require('./imageModel');
const fs = require('fs');

const ImageController = {

  pushImagesToServer (req, res, next) {
    console.log('----- imageController.pushImagesToServer called. -----');
    fs.readFile(__dirname+'/imageDetails.txt','utf8', (err, data) => {
      if(err) {
        console.warn(err);
        res.status(500);
        res.end(JSON.stringify(err));
        return;
      }

      Image.remove({}, (err) => {
        if(err){
          res.status(500);
          res.end(JSON.stringify(err));
        } else {

          let promArr = [];
          data.split('\n').forEach(image => {
            
            let imageData = image.split('|');
            console.log(imageData);

            let imageObj = {
                name : imageData[0],
                tags : imageData[1].split(','),
                prices : []
            }
            
            imageData[2].split(',').forEach(priceKV => {
                let priceData = priceKV.split(':');
                imageObj.prices.push({
                  size : priceData[0],
                  amount : priceData[1]
                });
            });
            
            let promise = new Promise((resolve, reject) => {
              Image.create(imageObj, (err, response) => {
                console.log(response);
                //res.write(JSON.stringify(response));
                return resolve();
              });
            });
            promArr.push(promise);
          });

          Promise.all(promArr)
          .then(() => {
            res.status(201);
            res.send('All images loaded');
          })
          .catch(err => {
            console.warn(err);
          });
        }
      });
    });
  },

  getAllImages (req, res, next) {
    console.log('----- imageController.getAllImages called. -----');
    Image.find({})
    .then((response) => {
      res.header(200);
      res.send(response);
    })
  },

  findSpecificImages (req, res, next) {
    console.log('----- imageController.findSpecificImages called. -----');
    let tag = req.query.tag;
    Image.find({
      tags : tag
    })
    .then((response) => {
      res.header(200);
      res.send(response);
    })
  }
}

module.exports = ImageController