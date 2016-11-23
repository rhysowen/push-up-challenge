import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import NotificationScreen from '../../components/more/NotificationScreen';

function mapStateToProps(state) {
  return {
    notification: state.more.notification,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
