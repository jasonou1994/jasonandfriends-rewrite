/**
 * ************************************
 *
 * @module  cardsReducer.js
 * @author
 * @date
 * @description reducer for loyalty cards
 *
 * ************************************
 */

// initialize state to keep track of total cards
import * as types from '../constants/actionTypes';

const initialState = {
  totalCards: 0,
};

// cardsReducer
const cardsReducer = (state=initialState, action) => {
  let totalCards = state.totalCards;

  switch(action.type) {
    case types.ADD_CARD:
      totalCards++;
      return {
        ...state,
        totalCards,
      };

      // delete card

    default:
      return state;
  }
};

export default cardsReducer;