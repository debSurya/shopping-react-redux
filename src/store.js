import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from './reducers/productsReducers';

const initialState = {};
const composeEnhancer = window._DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(combineReducers({
    products: productsReducer
}),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;