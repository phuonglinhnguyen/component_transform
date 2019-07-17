import { connect } from 'react-redux';

import CommonProcessing from '../components/common_processing';

import { closeSnackbar } from '../actions/common_action';

const mapStateToProps = state => {
  const { common_processing } = state.common;
  return { common_processing };
};

const mapDispatchToProps = dispatch => ({
  closeSnackbar: () => {
    dispatch(closeSnackbar());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommonProcessing);
