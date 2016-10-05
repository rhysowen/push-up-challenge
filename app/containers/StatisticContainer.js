import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';

import StatisticScreen from '../components/statistic/StatisticScreen';

function mapStateToProps(state) {
  return {
    statistics: state.statistics,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StatisticScreen);
