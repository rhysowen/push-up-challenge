import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import PreviewScreen from '../../components/exercise/PreviewScreen';

const mapStateToProps = state => ({
  previewProgram: state.previewProgram,
  util: state.more.util,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen);
