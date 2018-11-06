const Cart = require('./cartModel.js');

const cartController = {
    createCart(cookieId) {
        console.log('----- cartController.createCart called. -----');
        Cart.create({
            cookieId : cookieId,
            status : 'initialized',
        },(err, response) => {
            console.log('createCart: ', response);
            console.warn('err', err);
        })
    },

    getCart(req, res, next) {
        console.log('----- cartController.getCart called. -----');
        Cart.findOne({
            cookieId : req.cookies['jasonandfriends-cart']
        },(err, response) => {
            if(err){
                console.warn(err);
                res.header(500);
                res.end();
            } else {
                console.log('getCart: ', response);
                res.header(200);
                res.send(response);
            }
        })
    },

    deleteFromCart (req, res, next) {
        console.log('----- cartController.deleteCart called. -----');
        Cart.updateOne({
            cookieId : req.cookies['jasonandfriends-cart'],
        },{
            $pull: {'products':{
                imageName : req.body.imageName,
                size : req.body.size,
            }}
        },(err, response) => {
            
            if (err) {
                res.header(500);
                res.end();
            } else {
                console.log('deleteCart: ', response);
                res.header(202);
                res.send(response);
            }
        })
    },
    
    updateCart(req, res, next) {
        //first try to see if a product with matching name already exists and if so, only update the quantity
        console.log('----- cartController.updateCart called. -----');
        Cart.updateOne({
            cookieId : req.cookies['jasonandfriends-cart'],
            'products.imageName' : req.body.imageName,
            'products.size' : req.body.size,
        },{
            $inc: {'products.$.quantity': req.body.quantity}
        }, (err, response) => {
            console.log('updateCart_existingProduct: ', response);
            if(err){
                res.header(500);
                res.end();
            }
            //if nothing was modified, need to push a new product in
            else if(response.nModified === 0) {

                let newProduct = {
                    imageName : req.body.imageName,
                    size : req.body.size,
                    price : req.body.price.substring(1),
                    quantity : req.body.quantity,
                }

                Cart.updateOne({
                    cookieId : req.cookies['jasonandfriends-cart']
                },{
                    $push: {products : newProduct}
                }, (err, response) => {
                    console.log(response);
                    if(err){
                        res.header(500);
                        res.end();
                    } else {
                        console.log('updateCart_newProduct: ', response);
                        res.header(202);
                        res.end();
                    }
                });
            } 
            //meaning response was modified
            else {
                res.header(202);
                res.end();
            }
        });
    }
};

module.exports = cartController

