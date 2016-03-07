import {connect} from 'react-redux';
import {toggleDialogue} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        open: state.dialogues.get(ownProps.id, false)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onToggle: () => {
            return dispatch(toggleDialogue(ownProps.id))
        },
        onRequestClose: () => {
            return dispatch(toggleDialogue(ownProps.id))
        }
    }
};

const ReduxDialogue = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default ReduxDialogue
