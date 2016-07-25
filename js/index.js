import {Provider} from 'react-redux';
import promiseMiddlware from 'redux-promise';
import {createAction, handleAction} from 'redux-actions';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';

import configureStore from './store';

import {getNewDocument} from './actions';
import MaybeDocument from './components/maybedocument';
import ErrorList from './components/errorlist';
import {AppBar} from 'material-ui';
import {Spacing} from 'material-ui/lib/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';


const initialState = {
    document: null,
    documents: []
};

let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <div>
            <AppBar zDepth={4} style={{position: 'fixed', top: 0}} title="Core Viewer"/>
            <div style={{
            paddingTop: Spacing.desktopKeylineIncrement,
                margin: Spacing.desktopGutter
            }}>
                <MaybeDocument />
                <ErrorList />
            </div>
        </div>
    </Provider>,
    document.getElementById('nostril')
);

