import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../../actions';

import MedicalInformationScreen from '../../components/more/MedicalInformationScreen';

function mapStateToProps(state) {
  return { };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MedicalInformationScreen);
