const SquareConnect = require('square-connect');
const fetch = require('node-fetch');
const uuidv4 = require('uuid/v4');

const Cart = require('../cart/cartModel.js');

const accessToken = 'sandbox-sq0atb-mSDCjKiIQX0jRnr5zmegQQ'
const locationId = 'CBASECbiGBY51dpO_8oKEi921jwgAQ'

const squareController = {};
squareController.processPayment = processPayment;
squareController.confirmPayment = confirmPayment;

function processPayment(req, res, next) {
  
  Cart.findOne({
    cookieId : req.cookies['jasonandfriends-cart'],
  })
  .then(response => {
    let lineItems = response.products.map(cartProduct => {

      let price = new SquareConnect.Money();
      price.amount = cartProduct.price*100;
      price.currency = 'USD'

      let item = new SquareConnect.CreateOrderRequestLineItem();
      item.name = cartProduct.imageName.split('.jpg')[0] + " " + cartProduct.size;
      item.quantity = cartProduct.quantity.toString();
      item.base_price_money = price; 
      
      return item;
    });

    let order = new SquareConnect.CreateOrderRequest();
    order.idempotency_key = uuidv4();
    order.line_items = lineItems;

    fetch(`https://connect.squareup.com/v2/locations/${locationId}/checkouts`,{
    method : 'POST',
    headers : {
      'Authorization' : 'Bearer ' + accessToken,
    },
    body : JSON.stringify({
      idempotency_key : uuidv4(),
      order : order,
      ask_for_shipping_address : true,
      merchant_support_email : 'jason@jasonandfriends.net',
      redirect_url : 'http://localhost:3000/utils/payment',
    }),
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      res.send({
        url : response.checkout.checkout_page_url
      })
    })
    .catch(err => console.warn(err));

  })
  .catch(err => {
    res.header(500).send({
      DatabaseError: "Error finding cart.",
      error: err,
    });
  })  
}

function confirmPayment(req, res, next) {
  let transactionId = req.query.transactionId;
  fetch (`https://connect.squareup.com/v2/locations/${locationId}/transactions/${transactionId}`, {
    headers : {
      'Authorization' : 'Bearer ' + accessToken,
    },
  })
  .then (response => response.json())
  .then (response => {

    let amountCharged = response.transaction.tenders[0].amount_money.amount;
    let currency = response.transaction.tenders[0].amount_money.currency;
    let cardStatus = response.transaction.tenders[0].card_details.status;

    console.log(amountCharged, currency, cardStatus);

    Cart.findOne({
      cookieId : req.cookies['jasonandfriends-cart'],
    })
    .then(cart => {
      let cartAmount = cart.products.map(cartProduct => {
        return cartProduct.price * cartProduct.quantity;
      }).reduce((acc, current) => {
        return acc + current;
      })*100;

      //perform final verification and set status
      let cartStatus = (cartAmount === amountCharged && currency === 'USD' && cardStatus === 'CAPTURED') ? 'paid' : 'notpaid';
      
      Cart.updateOne({
        cookieId : req.cookies['jasonandfriends-cart'],
      }, {
        status : cartStatus,
        products : [],
      })
      .then(updatedCart => { 
        console.log('updatedCart', updatedCart);
        next(); 
      })
      .catch(err => console.warn(err));

    })
    .catch(err => console.warn(err));
  });

}

module.exports = squareController;
