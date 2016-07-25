import {connect} from 'react-redux';
import React from 'react';
import {closeError} from '../actions';

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeError: (error) => { return dispatch(closeError(error)); }
    }
};

const List = (props) => {
    return (
        <ul
            style={{
                position: "fixed",
                top: ".4em",
                right: "1em",
                listStyleType: "none",
                padding: 0,
                width: "240pt"
            }}
        >
            {props.errors.map((error) => (
                <li
                    key={error.text.message + error.time}
                    style={{
                        borderRadius: 2,
                        border: "thin solid #b00",
                        background: "rgba(200, 0, 0, 0.5)",
                        padding: ".5em",
                        marginBottom: ".5em"
                    }}
                >
                    <span style={{float: "right", cursor: "pointer"}}
                          onClick={() => {props.closeError(error)}}
                    >
                        &times;
                    </span>
                    {error.time.toString()}: {error.text.message}
                </li>
            ))}
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
