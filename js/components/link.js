import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import {map, fromPairs, isUndefined, bind} from 'lodash'
import {FlatButton, Dialog, TextField} from 'material-ui'

import {getNewDocument, actionInPlace} from '../actions';
import Dialogue from './dialogue';
import {reduxForm} from 'redux-form';

let mapStateToProps = function () {
    return {};
};

String.prototype.toProperCase = function () {
    return this.replace(/_/, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

let mapDispatchToProps = (dispatch) => {
    return {
        onAction: (document, action, params) => {
            return dispatch(getNewDocument(document.action(action, params)));
        },
        onActionInPlace: (document, action, params) => {
            return dispatch(actionInPlace(document.url, document.action(action, params)));
        }
    };
};


let InnerDialogue = (props) => {
    const actions = [
        <FlatButton
            key="cancel"
            label="Cancel"
            secondary={true}
            onTouchTap={props.onRequestClose}
        />,
        <FlatButton
            key="action"
            label={props.name.toProperCase()}
            primary={true}
            onTouchTap={() => { props.handleSubmit().then(function () {props.onRequestClose()}) }}
        />
    ];

    return (
        <FlatButton label={props.name.toProperCase()} onTouchTap={() => (props.onToggle(props.id))}>
            <Dialog title={props.name.toProperCase()} open={props.open} actions={actions} modal={false}>
                {map(props.link.fields, (x) => (
                    <div key={x.name}>
                        <TextField
                            floatingLabelText={x.name}
                            id={x.name}
                            required={x.required}
                            {...props.fields[x.name]}
                        />
                    </div>
                ))}
            </Dialog>
        </FlatButton>
    );
};

const WrappedDialogue = Dialogue(InnerDialogue);

// ({document, link, name, onAction}) =>
class Link extends Component {
    onAction (params) {
        let link = this.props.link,
            action = this.props.name,
            p;
        //console.log("In link onSubmit:", this.props.document, action, link.fields, params);
        if (link.inPlace && link.inPlace()) {
            p = this.props.onActionInPlace(this.props.document, action, params).then();
        } else {
            p = this.props.onAction(this.props.document, action, params);
        }
        return p;
    }
    /*

     */
    render () {
        let link = this.props.link,
            onAction = bind(this.onAction, this);
        let absoluteLinkIdentifier = this.props.document.base_url + "#" + this.props.name;
        let DoubleWrappedDialogue = reduxForm({
            form: absoluteLinkIdentifier,
            fields: link.fields && link.fields.map((x) => (x.name)) || [],
            onSubmit: onAction
        })(WrappedDialogue);
        let initialValues = link.fields && fromPairs(link.fields.map((x) => [x.name, this.props.document.fields.get(x.name)])) || {};
        console.log("init vals:", initialValues);
        return (
            <DoubleWrappedDialogue
                initialValues={initialValues}
                link={link}
                id={absoluteLinkIdentifier}
                name={this.props.name}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Link);
