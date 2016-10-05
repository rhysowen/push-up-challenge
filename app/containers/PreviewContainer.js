import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import PreviewScreen from '../components/exercise/PreviewScreen';

function mapStateToProps(state) {
  return {
    program: state.program,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen);
