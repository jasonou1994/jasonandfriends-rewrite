const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const path = require('path');
const utilRouter = express.Router();

app.use(bodyParser());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(80, "0.0.0.0", () => {
    console.log('Express server on 80');
});

mongoose.connect('mongodb://jason:jasonou1@ds145093.mlab.com:45093/jasonandfriends');
mongoose.connection.once('open', () => {
    console.log('Connected to jasonandfriends MLabs MongoDB');
});

const imageController = require('./images/imageController');
const cookieController = require('./cookies/cookieController');
const cartController = require('./cart/cartController')
const squareController = require('./payment/squareController');


//CLIENT ROUTES
app.get('/', cookieController.setCookie, (req, res, next) => {
    res.header(200);
    res.sendFile(path.join(__dirname,'../../dist','index.html'))
});

app.get('/bundle.js', (req, res, next) => {
    res.header(200);
    res.sendFile(path.join(__dirname,'../../dist','bundle.js'));
});

app.get('/styles.css', (req, res, next) => {
    res.header(200);
    res.sendFile(path.join(__dirname,'../../dist','styles.css'));
});

app.get('/assets/thumbnails/:assetPath', (req, res, next) => {
    res.header(200);
    res.sendFile(path.join(__dirname,'../../assets/thumbnails',req.params.assetPath));
});

app.get('/assets/full/:assetPath', (req, res, next) => {
    res.header(200);
    res.sendFile(path.join(__dirname,'../../assets/full',req.params.assetPath));
});

app.get('/assets/icons/:assetPath', (req, res, next) => {
    res.header(200);
    res.sendFile(path.join(__dirname,'../../assets/icons',req.params.assetPath));
});

//UTIL ROUTES
app.use('/utils', utilRouter);

utilRouter.post('/',  imageController.pushImagesToServer);
utilRouter.get('/', imageController.getAllImages);
utilRouter.get('/image', imageController.findSpecificImages);

utilRouter.post('/cart', cartController.updateCart);
utilRouter.get('/cart', cartController.getCart);
utilRouter.delete('/cart', cartController.deleteFromCart);
utilRouter.put('/cart', cookieController.resetCookie, (req, res) => {
    res.send({});
});

utilRouter.post('/payment', squareController.processPayment);
utilRouter.get('/payment', squareController.confirmPayment, (req, res) => {
    res.redirect ('/');
});



module.exports = app;
