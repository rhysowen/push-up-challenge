import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import RoutineScreen from '../components/routine/RoutineScreen';

function mapStateToProps(state) {
  return {
    program: state.program,
    statistics: state.statistics,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScreen);
