const cartController = require('../cart/cartController')
const Cart = require('../cart/cartModel.js');

const cookieController = {};
cookieController.setCookie = setCookie;
cookieController.resetCookie = resetCookie;

function setCookie(req, res, next) {
  //if no cookie exists...
  console.log('----- cookieController.setCookie called. -----');
  if(!req.cookies['jasonandfriends-cart']){
    const rand = Math.floor(Math.random() * 1000000);
    res.cookie('jasonandfriends-cart', rand, {expire : new Date() + 9999});

    cartController.createCart(rand);
    next();
  } 
  //confirm that the cookie exists in the db
  else {
    Cart.find({
      cookieId : req.cookies['jasonandfriends-cart']
    })
    .then(response => {
      if(response.length === 0) {
        cartController.createCart(req.cookies['jasonandfriends-cart']);
      }
      next();
    });
  }
}

function resetCookie(req, res, next) {
  console.log('----- cookieController.resetCookie called. -----');
  const rand = Math.floor(Math.random() * 1000000);
  res.cookie('jasonandfriends-cart', rand, {expire : new Date() + 9999});

  cartController.createCart(rand);
  next();
}

module.exports = cookieController;
