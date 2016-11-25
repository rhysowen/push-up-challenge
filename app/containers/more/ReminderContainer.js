import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import ReminderScreen from '../../components/more/ReminderScreen';

function mapStateToProps(state) {
  return { reminder: state.reminder };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReminderScreen);
