import {createAction} from 'redux-actions';

export const getNewDocument = createAction('GET_NEW_DOCUMENT');

export const actionInPlace = createAction(
    'ACTION_IN_PLACE',
    (document, promise) => promise,
    (document, promise) => document
);

export const toggleDialogue = createAction('TOGGLE_DIALOGUE');
