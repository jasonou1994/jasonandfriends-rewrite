/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';

// import all reducers here
import cardsReducer from './cardsReducer';
import marketsReducer from './marketsReducer';


// combine reducers
const reducers = combineReducers({
  cards: cardsReducer,
  markets: marketsReducer,
});

// make the combined reducers available for import
export default reducers;

