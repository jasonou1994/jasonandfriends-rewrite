import * as types from '../actions/actionTypes';


const initialState = {
  displayedImages : [],
  imageFilterTag : "",
  imageForBlowUp : "",
  isDisplayedBlowUp : 'none',
  isDisplayedCart : 'none',
  isDisplayedSideBar : false,
  isDisplayedConfirmation : false,
  cartProducts : [],

  screenWidth : typeof window === 'object' ? window.innerWidth : null,
  sidebarHeight : 0,
  headerHeight : 114,
};

const reducer = (state=initialState, action) => {
  //console.log(action.type);
  switch(action.type) {
    case types.UPDATE_STATE_IMAGES:{
      console.log('action',action);
      let displayedImages = [];
      action.payload.displayImages.forEach(image => {
        displayedImages.push(image);
      });
      return {
        ...state,
        displayedImages,
        imageFilterTag : action.payload.tag
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
        cartProducts,
        isDisplayedConfirmation : action.payload.status === 'paid' ? true : false,
      }
    }

    case types.TOGGLE_SIDE_BAR:{
      console.log('action',action);
      let isDisplayedSideBar = !state.isDisplayedSideBar;
      ;
      return {
        ...state,
        isDisplayedSideBar,
      }
    }

    case types.HIDE_CONFIRMATION:{
      console.log('action',action);
      return {
        ...state,
        isDisplayedConfirmation : false,
      }
    }    

    case types.SCREEN_RESIZE:{
      console.log('action',action);
      return {
        ...state,
        screenWidth : action.payload,
      }
    }

    case types.UPDATE_SIDEBAR_HEIGHT:{
      console.log('action',action);
      return {
        ...state,
        sidebarHeight : action.payload,
      }
    }    
    
    default:
      return state;
  }
};

export default reducer;