import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import MoreScreen from '../../components/more/MoreScreen';

function mapStateToProps(state) {
  return { util: state.more.util };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoreScreen);
