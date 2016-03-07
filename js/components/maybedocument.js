import React from 'react';
import { connect } from 'react-redux'

import {getNewDocument} from '../actions';

import Document from './document'
import Link from './link'

import get from 'coreapi';

import {TextField, RaisedButton} from 'material-ui';
import {reduxForm} from 'redux-form';


const mapStateToProps = (state) => {
    return {
        document: state.doc
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchNotes: () => {
            dispatch(getNewDocument(get("http://localhost:3000")));
        },
        fetchDocument: (document) => {
            dispatch(getNewDocument(get(document.base_url)));
        },
        getNewDocument: ({url}) => {
            dispatch(getNewDocument(get(url)));
        }
    }
};

const StartForm = ({fields, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <TextField title="URL" {...fields.url}/>
        <RaisedButton
            primary={true}
            onTouchTap={handleSubmit}
        >Go</RaisedButton>
    </form>
);

const ConnectedStartForm = reduxForm({
    form: "rootMaybe",
    fields: ["url"]
})(StartForm);

let MaybeDocument = ({document, onFetchNotes, fetchDocument, getNewDocument}) => {
    if (document !== null && typeof document !== 'undefined') {
        return (<Document document={document} fetchDocument={fetchDocument}/>);
    } else {
        return (<ConnectedStartForm onSubmit={getNewDocument} />);
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MaybeDocument)
