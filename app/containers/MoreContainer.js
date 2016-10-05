import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import MoreScreen from '../components/more/MoreScreen';

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoreScreen);
