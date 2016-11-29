import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import SoundScreen from '../../components/more/SoundScreen';

const mapStateToProps = state => ({ sound: state.sound });

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SoundScreen);
