import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import RoutineScreen from '../components/routine/RoutineScreen';

const mapStateToProps = state => ({
  program: state.program,
  exercise: state.exercise,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoutineScreen);
