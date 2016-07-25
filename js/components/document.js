import React, {PropTypes} from 'react';
import {CoreArray, CoreDocument} from 'coreapi-promise';
import Link from './link'
import {map, keys, join} from 'lodash'
import {Card, CardHeader, CardTitle, CardText, CardActions, List} from 'material-ui';
import {Spacing} from 'material-ui/lib/styles';


let wrapperStyle = {
    border: 'thin solid #aaa',
    borderRadius: '10pt',
    padding: '12pt'
};

let documentTitleStyle = {
    textDecoration: "underline"
};

const Document = ({document, fetchDocument}) => {

    function fieldToComponent(field, name) {
        if (name[0] === '_') {
            return null;
        }
        if (field instanceof CoreArray || field instanceof Array) {
            return (<List key="123">{map(field, fieldToComponent)}</List>)
        }
        if (field instanceof CoreDocument) {
            return (
                <Document key={field.base_url} document={field} fetchDocument={fetchDocument}/>
            )
        }
        if (field instanceof Object) {
            return (<div key={join(keys(field))}>{map(field, fieldToComponent)}</div>)
        }
        return (<li key={name}>{name}: {field.toString()}</li>)
    }

    return (<Card zDepth={2} key={document.base_url} style={{marginBottom: Spacing.desktopGutter}}>
        <CardTitle title={document.title} />
        <CardText>
            {document.fields.map(fieldToComponent).toList().filter((x) => (x !== null))}
        </CardText>
        <CardActions>
            {document.links.map((link, name) => (<Link document={document} key={name} name={name} link={link} />)).toList()}
        </CardActions>
    </Card>);
};

Document.propTypes = {};

export default Document;
