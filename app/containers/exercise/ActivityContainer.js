import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import ActivityScreen from '../../components/exercise/ActivityScreen';

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
