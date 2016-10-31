import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import CompleteScreen from '../../components/exercise/CompleteScreen';

const mapStateToProps = state => (
  {
    complete: state.complete,
    program: state.program,
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CompleteScreen);
