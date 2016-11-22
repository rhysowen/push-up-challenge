import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import InstructionScreen from '../../components/exercise/InstructionScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InstructionScreen);
