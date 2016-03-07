import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';

import reducer from './reducer';

const logging = store => next => action => {
    console.log("got action:", action);
    let result = next(action);
    console.log("result:", result);
    return result;
};
//
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, logging)(createStore);

export default function configureStore() {
    let store = createStoreWithMiddleware(reducer);

    if (module.onReload) {
        module.onReload(() => {
            const nextReducer = require('./reducer');
            store.replaceReducer(nextReducer.default || nextReducer);

            return true
        });
    }

    return store;
}
