import {combineReducers} from 'redux';
import {handleAction} from 'redux-actions';
import merge from '../node_modules/lodash/merge';
import {Map} from 'immutable';
import {reducer as formReducer} from 'redux-form';

function entities(state = { documents: {} }, action) {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }

    return state
}

let doc = function (state = null, action) {
    if (action.type == 'GET_NEW_DOCUMENT' && action.payload !== null) {
        return action.payload;
    }
    if (action.type == 'ACTION_IN_PLACE') {
        return state.updateDescendants(action.meta.base_url, action.payload);
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
    form: formReducer
}));
