const cartController = require('../cart/cartController')

const cookieController = {};
cookieController.setCookie = setCookie;
cookieController.resetCookie = resetCookie;

function setCookie(req, res, next) {
  // console.log(req.cookies);
  if(!req.cookies['jasonandfriends-cart']){
    const rand = Math.floor(Math.random() * 1000000);
    res.cookie('jasonandfriends-cart', rand, {expire : new Date() + 9999});

    cartController.createCart(rand);
  }
  
  next();
}

function resetCookie(req, res, next) {
  const rand = Math.floor(Math.random() * 1000000);
  res.cookie('jasonandfriends-cart', rand, {expire : new Date() + 9999});

  cartController.createCart(rand);
  console.log('hi');
  next();
}

module.exports = cookieController;
