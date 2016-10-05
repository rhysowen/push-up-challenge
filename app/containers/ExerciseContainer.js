import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import ExerciseScreen from '../components/exercise/ExerciseScreen';

function mapStateToProps(state) {
  return {

  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapStateToProps)(ExerciseScreen);
