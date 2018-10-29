import * as types from '../actions/actionTypes';


const initialState = {
  displayedImages : [],
  imageForBlowUp : "",
  isDisplayedBlowUp : 'none',
  isDisplayedCart : 'none',
  cartProducts : [],
};

const reducer = (state=initialState, action) => {
  //console.log(action.type);
  switch(action.type) {
    case types.UPDATE_STATE_IMAGES:{
      console.log('action',action);
      let displayedImages = [];
      action.payload.forEach(image => {
        displayedImages.push(image);
      });
      return {
        ...state,
        displayedImages
      }
    }
    case types.SET_BLOW_UP_IMAGE:{
      console.log('action',action);
      let imageForBlowUp = action.payload;
      let isDisplayedBlowUp = 'block';
      return {
        ...state,
        imageForBlowUp,
        isDisplayedBlowUp,
      }
    }

    case types.HIDE_BLOW_UP_IMAGE:{
      console.log('action',action);
      let imageForBlowUp = "";
      let isDisplayedBlowUp = 'none';
      return {
        ...state,
        imageForBlowUp,
        isDisplayedBlowUp,
      }
    }

    case types.SHOW_CART:{
      console.log('action',action);
      let isDisplayedCart = 'block';
      return {
        ...state,
        isDisplayedCart
      }
    }

    case types.HIDE_CART:{
      console.log('action',action);
      let isDisplayedCart = 'none';
      return {
        ...state,
        isDisplayedCart
      }
    }

    case types.UPDATE_STATE_CART:{
      console.log('action',action);
      let cartProducts = [];
      action.payload.products.forEach(product => {
        cartProducts.push({
          imageName : product.imageName,
          size: product.size,
          price : product.price,
          quantity : product.quantity
        });
      });
      return {
        ...state,
        cartProducts
      }
    }
    
    default:
      return state;
  }
};

export default reducer;