import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import ProgramScreen from '../components/program/ProgramScreen';

function mapStateToProps(state) {
  return {
    programs: state.programs,
    util: state.more.util,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProgramScreen);
