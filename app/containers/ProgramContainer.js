import { connect } from 'react-redux';

import ProgramScreen from '../components/ProgramScreen';

function mapStateToProps(state) {
  return {
    programs: state.programs,
  };
}

export default connect(mapStateToProps)(ProgramScreen);
