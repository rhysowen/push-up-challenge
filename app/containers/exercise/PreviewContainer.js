import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import PreviewScreen from '../../components/exercise/PreviewScreen';

const mapStateToProps = state => ({
  program: state.program,
  sound: state.sound,
  util: state.util,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen);
