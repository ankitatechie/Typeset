import { createStore } from 'redux';
import rootReducer from './reducers/index';
import data from './data/emojisData';

const defaultState = {
    data
};

const store = createStore(rootReducer, defaultState);
export default store;
