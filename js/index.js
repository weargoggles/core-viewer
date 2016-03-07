import {Provider} from 'react-redux';
import promiseMiddlware from 'redux-promise';
import {createAction, handleAction} from 'redux-actions';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';

import configureStore from './store';

import {getNewDocument} from './actions';
import MaybeDocument from './components/maybedocument';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const initialState = {
    document: null,
    documents: []
};

let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <MaybeDocument />
    </Provider>,
    document.getElementById('nostril')
);

