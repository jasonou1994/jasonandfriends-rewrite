const cartController = require('../cart/cartController')

const cookieController = {};
cookieController.setCookie = setCookie;
/**
* setCookie - set a cookie with a random number
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setCookie(req, res, next) {
  // console.log(req.cookies);
  if(!req.cookies['jasonandfriends-cart']){
    const rand = Math.floor(Math.random() * 1000000);
    res.cookie('jasonandfriends-cart', rand, {expire : new Date() + 9999});

    cartController.createCart(rand);
  }

  
  next();
}

module.exports = cookieController;
