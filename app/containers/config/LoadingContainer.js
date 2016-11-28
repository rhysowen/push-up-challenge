import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import LoadingScreen from '../../components/config/LoadingScreen';

function mapStateToProps(state) {
  return {
    program: state.program,
    exercise: state.exercise,
    util: state.util,
    sound: state.sound,
    reminder: state.reminder,
    analytics: state.analytics,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
