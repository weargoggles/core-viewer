import {combineReducers} from 'redux';
import {handleAction} from 'redux-actions';
import merge from '../node_modules/lodash/merge';
import isNumber from 'lodash/isNumber';
import {Map, List} from 'immutable';
import {reducer as formReducer} from 'redux-form';

function entities(state = { documents: {} }, action) {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }

    return state
}

let doc = function (state = null, action) {
    if (action.error) {
        return state;
    }

    if (action.type == 'GET_NEW_DOCUMENT' && action.payload !== null) {
        return action.payload;
    }

    if (action.type == 'ACTION_IN_PLACE') {
        return state.updateDescendants(action.meta.base_url, action.payload);
    }
    return state;
};

let errors = function (state = (new List()), action) {

    if (action.type == 'CLOSE_ERROR') {
        // payload is the index of the error to be deleted
        let [key] = state.findEntry((x) => (x === action.payload));
        if (isNumber(key)) {
            return state.delete(key);
        }
    }
    if (action.error) {
        return state.unshift({
            time: new Date(),
            text: action.payload
        });
    }
    return state;
};

let dialogues = function (state = (new Map()), action) {
    if (action.type == 'TOGGLE_DIALOGUE') {
        return state.set(action.payload, !state.get(action.payload, false));
    }
    return state;
};

export default combineReducers(Object.assign({}, {
    doc,
    dialogues,
    entities,
    errors,
    form: formReducer
}));
