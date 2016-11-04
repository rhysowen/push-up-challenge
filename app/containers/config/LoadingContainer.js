import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import LoadingScreen from '../../components/config/LoadingScreen';

function mapStateToProps(state) {
  return {
    program: state.program,
    exercise: state.exercise,
    more: state.more,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
